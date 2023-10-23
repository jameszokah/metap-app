import express from 'express';


process.title = 'metap server';

import Logger from './lib/logger/Logger';
import Room from './lib/Room';
import Peer from './lib/Peer';
import {userRoles} from './lib/access/roles';
import {
	loginHelper,
	logoutHelper
} from './lib/helpers/httpHelper';
import { config, configError } from './lib/config/config';
import interactiveServer from './lib/interactive/Server';
import promExporter from './lib/stats/promExporter';

import bcrypt from 'bcrypt';
import fs from 'fs';
import http from 'http';
import https from 'https';
import { uuidv4 } from 'uuid'

if (Number(process.versions.node.split('.')[0]) < 15)
{
	/* eslint-disable no-unused-vars */
	const spdy =  import('spdy');
}


import cookieParser from 'cookie-parser';
// import compression from 'compression;
import { AwaitQueue }from 'awaitqueue';
import base64 from 'base-64';
import helmet from 'helmet';
import * as radis from 'redis';
import { runHttpsServer } from './lib/server/http';
import { runWebSocketServer } from './lib/server/socket';
import { runMediasoupWorkers } from './lib/server/media';
import { statusLog } from './utils/statusLog';

const host = process.env.HOST ?? 'localhost';
const port = process.env.PORT ? Number(process.env.PORT) : 3000;

const app = express();


if (configError)
{
	/* eslint-disable no-console */
	console.error(`Invalid config file: ${configError}`);
	process.exit(-1);
}

const redisClient = radis.createClient(config.redisOptions);

/* eslint-disable no-console */
console.log('- process.env.DEBUG:', process.env.DEBUG);
console.log('- config.mediasoup.worker.logLevel:', config.mediasoup.worker.logLevel);
console.log('- config.mediasoup.worker.logTags:', config.mediasoup.worker.logTags);
/* eslint-enable no-console */

const logger = new Logger();

const queue = new AwaitQueue();

let statusLogger = null;

if ('StatusLogger' in config)
	statusLogger = new config.StatusLogger();

// mediasoup Workers Map.
const mediasoupWorkers: Map<number, any> = new Map();

// Map of Room instances indexed by roomId.
const rooms: Map<string, Room> = new Map();

// Map of Peer instances indexed by peerId.
const peers: Map<string, Peer> = new Map();

app.use(helmet.hsts());
const sharedCookieParser = cookieParser();

app.use(sharedCookieParser);
app.use(express.json({ limit: '5mb' }));
app.use(express.urlencoded({ limit: '5mb', extended: true }));

// const session = expressSession({
// 	secret            : config.cookieSecret,
// 	name              : config.cookieName,
// 	resave            : true,
// 	saveUninitialized : true,
// 	store             : new RedisStore({ client: redisClient }),
// 	cookie            : {
// 		secure   : true,
// 		httpOnly : true,
// 		maxAge   : 60 * 60 * 1000 // Expire after 1 hour since last request from user
// 	}
// });

if (config.trustProxy)
{
	app.set('trust proxy', config.trustProxy);
}

// app.use(session);



let mainListener: http.Server;
let io;




async function run()
{
	try
	{
		// Open the interactive server.
		await interactiveServer(rooms, peers);

		if (typeof (config.auth) === 'undefined')
		{
			logger.warn('Auth is not configured properly!');
		}
		else
		{
			// await setupAuth();
		}

		// Run a mediasoup Worker.
		await runMediasoupWorkers(mediasoupWorkers);

		// Run HTTPS server.
		await runHttpsServer(app, mainListener);

		// start Prometheus exporter
		if (config.prometheus.enabled)
		{
			await promExporter(mediasoupWorkers, rooms, peers);
		}

		// Run WebSocketServer.
		await runWebSocketServer(mainListener, rooms, peers, queue);

		// eslint-disable-next-line no-unused-vars
		const errorHandler = (err, req, res, next) =>
		{
			const trackingId = uuidv4();

			res.status(500).send(
				`<h1>Internal Server Error</h1>
				<p>If you report this error, please also report this
				<i>tracking ID</i> which makes it possible to locate your session
				in the logs which are available to the system administrator:
				<b>${trackingId}</b></p>`
			);
			logger.error(
				'Express error handler dump with tracking ID: %s, error dump: %o',
				trackingId, err);
		};

		// eslint-disable-next-line no-unused-vars
		app.use(errorHandler);
	}
	catch (error)
	{
		logger.error('run() [error:"%o"]', error);
	}
}



app.listen(port, host, () => {
  console.log(`[ ready ] http://${host}:${port}`);
});




/**
 * Get a Room instance (or create one if it does not exist).
 */
export async function getOrCreateRoom({ roomId })
{
	let room = rooms.get(roomId);

	// If the Room does not exist create a new one.
	if (!room)
	{
		logger.info('creating a new Room [roomId:"%s"]', roomId);

		// const mediasoupWorker = getMediasoupWorker();

		room = await Room.create({ mediasoupWorkers, roomId, peers });

		rooms.set(roomId, room);

		statusLog(rooms, peers);

		room.on('close', () =>
		{
			rooms.delete(roomId);

			statusLog(rooms, peers);
		});
	}

	return room;
}

run();



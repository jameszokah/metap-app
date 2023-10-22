 import io from 'socket.io'
import Logger from '../logger/Logger';
import { config } from '../config/config';
import { statusLog } from '../../utils/statusLog';
// import { getOrCreateRoom } from '../../main';
import Peer from '../Peer';
import Room from '../Room';
import { AwaitQueue } from 'awaitqueue';
import * as http from 'http'
import * as https from 'https'
import { getOrCreateRoom } from '../../server';


/**
 * Create a WebSocketServer to allow WebSocket connections from browsers.
 */
export async function runWebSocketServer(mainListener: http.Server | https.Server , rooms: Map<string, Room>, peers: Map<string, Peer>, queue: AwaitQueue)
{

    const ioServer = new io.Server(mainListener, { cookie: false })

    const logger = new Logger()


	// ioServer.use(
	// 	sharedSession(session, sharedCookieParser, {})
	// );

	// Handle connections from clients.
	ioServer.on('connection', (socket) =>
	{
		const { roomId, peerId } = socket.handshake.query as {roomId: string, peerId: string};

		if (!roomId || !peerId)
		{
			logger.warn('connection request without roomId and/or peerId');

			socket.disconnect(true);

			return;
		}

		logger.info(
			'connection request [roomId:"%s", peerId:"%s"]', roomId, peerId);

		queue.push(async () =>
		{
			const room = await getOrCreateRoom({ roomId });
			const token = null;

			// if (socket.handshake.session.peerId === peerId)
			// {
			// 	token = room.getToken(peerId);
			// }

			let peer = peers.get(peerId);
			let returning = false;

			if (peer && !token)
			{ // Don't allow hijacking sessions
				socket.disconnect(true);

				return;
			}
			else if (token && room.verifyPeer({ id: peerId, token }))
			{ // Returning user, remove if old peer exists
				if (peer)
					peer.close();

				returning = true;
			}

			peer = new Peer({ id: peerId, roomId, socket });

			peers.set(peerId, peer);

			peer.on('close', () =>
			{
				peers.delete(peerId);

				statusLog(rooms,peers);
			});

			// if (
			// 	Boolean(socket.handshake.session.passport) &&
			// 	Boolean(socket.handshake.session.passport.user)
			// )
			// {
			// 	const {
			// 		id,
			// 		displayName,
			// 		picture,
			// 		email,
			// 		_userinfo
			// 	} = socket.handshake.session.passport.user;

			// 	peer.authId = id;
			// 	peer.displayName = displayName;
			// 	peer.picture = picture;
			// 	peer.email = email;
			// 	peer.authenticated = true;

			// 	if (typeof config.userMapping === 'function')
			// 	{
			// 		await config.userMapping({ peer, room, roomId, userinfo: _userinfo });
			// 	}
			// }

			room.handlePeer({ peer, returning });

			// socket.handshake.session.peerId = peer.id;
			// socket.handshake.session.touch();
			// socket.handshake.session.save();

			statusLog(rooms,peers);
		})
			.catch((error) =>
			{
				logger.error('room creation or room joining failed [error:"%o"]', error);

				if (socket)
					socket.disconnect(true);

				return;
			});
	});




}


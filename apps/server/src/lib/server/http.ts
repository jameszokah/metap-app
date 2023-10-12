import { config } from "../config/config";
import express, { Application, NextFunction, Request, Response } from 'express'
import Logger from "../logger/Logger";
import http from 'http'
import https from 'https'
import spdy from 'spdy'
import { tls } from "../../utils/tls";


interface HttpRequest extends Request {
    isAuthenticated: boolean,
    user: any,
}
 
export async function runHttpsServer(app: Application, mainListener: http.Server) {

    const logger = new Logger();
	// app.use(compression());

	app.use('/.well-known/acme-challenge', express.static('dist/public/.well-known/acme-challenge'));

	app.all('*', async (req: HttpRequest, res: Response, next: NextFunction) =>
	{
		if (req.secure || config.httpOnly)
		{
			let ltiURL;

			try
			{
				ltiURL = new URL(`${req.protocol}://${req.get('host')}${req.originalUrl}`);
			}
			catch (error)
			{
				logger.error('Error parsing LTI url: %o', error);
			}

			if (
				req.isAuthenticated &&
				req.user &&
				req.user.displayName &&
				!ltiURL.searchParams.get('displayName') &&
				!isPathAlreadyTaken(req.url)
			)
			{

				ltiURL.searchParams.append('displayName', req.user.displayName);

				res.redirect(ltiURL);
			}
			else
				return next();
		}
		else
			res.redirect(`https://${req.hostname}${req.url}`);

	});

	// Serve all files in the public folder as static files.
	app.use(express.static('dist/public', {
		maxAge : config.staticFilesCachePeriod
	}));


	if (config.httpOnly === true)
	{
		// http
		mainListener = http.createServer(app);
	}
	else
	{
		// https
		// spdy is not working anymore with node.js > 15 and express 5 
		// is not ready yet for http2
		// https://github.com/spdy-http2/node-spdy/issues/380
		if (typeof(spdy) === 'undefined')
		{
			logger.info('Found node.js version >= 15 disabling spdy / http2 and using node.js/https module');
			mainListener = https.createServer(tls, app);
		}
		else
		{
			
			mainListener = spdy.createServer(tls, app);
		}

		// http -> https redirect server
		if (config.listeningRedirectPort)
		{
			const redirectListener = http.createServer(app);

			if (config.listeningHost)
				redirectListener.listen(config.listeningRedirectPort, config.listeningHost);
			else
				redirectListener.listen(config.listeningRedirectPort);
		}
	}

	// https or http
	if (config.listeningHost)
		mainListener.listen(config.listeningPort, config.listeningHost);
	else
		mainListener.listen(config.listeningPort);
}

export function isPathAlreadyTaken(actualUrl)
{
	const alreadyTakenPath =
		[
			'/config/',
			'/static/',
			'/images/',
			'/sounds/',
			'/favicon.',
			'/auth/'
		];

	alreadyTakenPath.forEach((path) =>
	{
		if (actualUrl.toString().startsWith(path))
			return true;
	});

	return false;
}
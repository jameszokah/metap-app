#!/usr/bin/env node

process.title = 'metap server';

import Logger from './lib/logger/Logger';
const Room = require('./lib/Room');
const Peer = require('./lib/Peer');
const userRoles = require('./lib/access/roles');
const {
	loginHelper,
	logoutHelper
} = require('./lib/helpers/httpHelper');
const { config, configError } = require('./lib/config/config');
const interactiveServer = require('./lib/interactive/Server');
const promExporter = require('./lib/stats/promExporter');

const bcrypt = require('bcrypt');
const fs = require('fs');
const http = require('http');
const https = require('https');

if (process.versions.node.split('.')[0] < 15)
{
	/* eslint-disable no-unused-vars */
	const spdy = require('spdy');
}

const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const compression = require('compression');
const mediasoup = require('mediasoup');
const AwaitQueue = require('awaitqueue');
const base64 = require('base-64');
const helmet = require('helmet');
// auth
const passport = require('passport');
const LTIStrategy = require('passport-lti');
const imsLti = require('ims-lti');
const SAMLStrategy = require('passport-saml').Strategy;
const LocalStrategy = require('passport-local').Strategy;
const redis = require('redis');
const { Issuer, Strategy, custom } = require('openid-client');
const expressSession = require('express-session');
const RedisStore = require('connect-redis')(expressSession);
const sharedSession = require('express-socket.io-session');
const { v4: uuidv4 } = require('uuid');



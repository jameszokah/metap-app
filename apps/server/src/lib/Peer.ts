import Logger from './logger/Logger';

import  {EventEmitter} from 'events';
import {userRoles} from './access/roles';
import { Socket } from 'socket.io';
import { PeerType } from './types/peer';
import { UserRoleType } from './types/types';


const logger = new Logger('Peer');

const RECORDING_TYPE_LOCAL='local';





export default class Peer extends EventEmitter implements PeerType {

	_id: string;
	_socket: Socket;
	_authId: null;
	_authenticated: boolean;
	_authenticatedTimestamp: number | null;
	_closed: boolean;
	_consumers: Map<any, any> | null;
	_displayName: null;
	_email: null;
	_inLobby: false;
	_joined: false;
	_joinedTimestamp: number | null;
	_localRecordingState: null;
	_picture: null;
	_producers: Map<any, any> | null;
	_raisedHand: boolean | null;
	_raisedHandTimestamp: number | null;
	_recordingStateHistory: object[] = [];
	_roles: UserRoleType[];
	_roomId: string;
	_routerId: string | null;
	_rtpCapabilities: null;
	_transports: Map<any, any> | null;	

	constructor({ id, roomId, socket }: {roomId: string, id: string, socket: Socket})
	{
		logger.info('constructor() [id:"%s"]', id);
		super();

		this._id = id;

		this._roomId = roomId;

		this._authId = null;

		this._socket = socket;

		this._closed = false;

		this._joined = false;

		this._joinedTimestamp = null;

		this._inLobby = false;

		this._authenticated = false;

		this._authenticatedTimestamp = null;

		this._roles = [ userRoles.NORMAL ];

		this._displayName = null;

		this._picture = null;

		this._email = null;

		this._routerId = null;

		this._rtpCapabilities = null;

		this._raisedHand = false;

		this._raisedHandTimestamp = null;

		this._localRecordingState = null;

		this._recordingStateHistory = [];

		this._transports = new Map();

		this._producers = new Map();

		this._consumers = new Map();

		this._handlePeer();
	}

	close()
	{
		logger.info('close()');

		this._closed = true;

		// Iterate and close all mediasoup Transport associated to this Peer, so all
		// its Producers and Consumers will also be closed.
		for (const transport of this.transports.values())
		{
			transport.close();
		}

		if (this.socket)
			this.socket.disconnect(true);

		this.emit('close');
	}

	_handlePeer()
	{
		if (this.socket)
		{
			this.socket.on('disconnect', (reason) =>
			{
				logger.info('"disconnect" event [id: %s], [reason: %s]',
					this.id, reason);

				if (this.closed)
					return;

				this.close();
			});
		}
	}

	get id()
	{
		return this._id;
	}

	set id(id)
	{
		this._id = id;
	}

	get roomId()
	{
		return this._roomId;
	}

	set roomId(roomId)
	{
		this._roomId = roomId;
	}

	get authId()
	{
		return this._authId;
	}

	set authId(authId)
	{
		this._authId = authId;
	}

	get socket()
	{
		return this._socket;
	}

	set socket(socket)
	{
		this._socket = socket;
	}

	get closed()
	{
		return this._closed;
	}

	get joined()
	{
		return this._joined;
	}

	set joined(joined)
	{
		joined ?
			this._joinedTimestamp = Date.now() :
			this._joinedTimestamp = null;

		this._joined = joined;
	}

	get joinedTimestamp()
	{
		return this._joinedTimestamp;
	}

	get inLobby()
	{
		return this._inLobby;
	}

	set inLobby(inLobby)
	{
		this._inLobby = inLobby;
	}

	get authenticated()
	{
		return this._authenticated;
	}

	set authenticated(authenticated)
	{
		if (authenticated !== this._authenticated)
		{
			authenticated ?
				this._authenticatedTimestamp = Date.now() :
				this._authenticatedTimestamp = null;

			const oldAuthenticated = this._authenticated;

			this._authenticated = authenticated;

			this.emit('authenticationChanged', { oldAuthenticated });
		}
	}

	get authenticatedTimestamp()
	{
		return this._authenticatedTimestamp;
	}

	get roles()
	{
		return this._roles;
	}

	get displayName()
	{
		return this._displayName;
	}

	set displayName(displayName)
	{
		if (displayName !== this._displayName)
		{
			const oldDisplayName = this._displayName;

			this._displayName = displayName;

			this.emit('displayNameChanged', { oldDisplayName });
		}
	}

	get picture()
	{
		return this._picture;
	}

	set picture(picture)
	{
		if (picture !== this._picture)
		{
			const oldPicture = this._picture;

			this._picture = picture;

			this.emit('pictureChanged', { oldPicture });
		}
	}

	get email()
	{
		return this._email;
	}

	set email(email)
	{
		this._email = email;
	}

	get routerId()
	{
		return this._routerId;
	}

	set routerId(routerId)
	{
		this._routerId = routerId;
	}

	get rtpCapabilities()
	{
		return this._rtpCapabilities;
	}

	set rtpCapabilities(rtpCapabilities)
	{
		this._rtpCapabilities = rtpCapabilities;
	}

	get raisedHand()
	{
		return this._raisedHand;
	}

	set raisedHand(raisedHand)
	{
		raisedHand ?
			this._raisedHandTimestamp = Date.now() :
			this._raisedHandTimestamp = null;

		this._raisedHand = raisedHand;
	}

	get raisedHandTimestamp()
	{
		return this._raisedHandTimestamp;
	}

	get transports()
	{
		return this._transports;
	}

	get producers()
	{
		return this._producers;
	}

	get consumers()
	{
		return this._consumers;
	}

	get localRecordingState()
	{
		return this._localRecordingState;
	}

	get recordingStateHistory()
	{
		return this._recordingStateHistory;
	}

	// eslint-disable-next-line @typescript-eslint/adjacent-overload-signatures
	set localRecordingState(recordingState) {
		this._localRecordingState=recordingState;
		this.addRecordingStateHistory(recordingState, RECORDING_TYPE_LOCAL);
	}

	addRecordingStateHistory(recordingState, recordingType)
	{
		this.recordingStateHistory.push({
			timestamp : Date.now(),
			recordingState,
			recordingType
		});
	}

	addRole(newRole)
	{
		if (
			!this._roles.some((role) => role.id === newRole.id) &&
			newRole.id !== userRoles.NORMAL.id // Can not add NORMAL
		)
		{
			this._roles.push(newRole);

			logger.info('addRole() | [newRole:"%s]"', newRole);

			this.emit('gotRole', { newRole });
		}
	}

	removeRole(oldRole)
	{
		if (
			this._roles.some((role) => role.id === oldRole.id) &&
			oldRole.id !== userRoles.NORMAL.id // Can not remove NORMAL
		)
		{
			this._roles = this._roles.filter((role) => role.id !== oldRole.id);

			logger.info('removeRole() | [oldRole:"%s]"', oldRole);

			this.emit('lostRole', { oldRole });
		}
	}

	hasRole(role)
	{
		return this._roles.some((myRole) => myRole.id === role.id);
	}

	addTransport(id, transport)
	{
		this.transports.set(id, transport);
	}

	getTransport(id)
	{
		return this.transports.get(id);
	}

	getConsumerTransport()
	{
		return Array.from(this.transports.values())
			.find((t) => t.appData.consuming);
	}

	removeTransport(id)
	{
		this.transports.delete(id);
	}

	addProducer(id, producer)
	{
		this.producers.set(id, producer);
	}

	getProducer(id)
	{
		return this.producers.get(id);
	}

	removeProducer(id)
	{
		this.producers.delete(id);
	}

	addConsumer(id, consumer)
	{
		this.consumers.set(id, consumer);
	}

	getConsumer(id)
	{
		return this.consumers.get(id);
	}

	removeConsumer(id)
	{
		this.consumers.delete(id);
	}

	get peerInfo()
	{
		const peerInfo =
		{
			id                    : this.id,
			displayName           : this.displayName,
			picture               : this.picture,
			roles                 : this.roles.map((role) => role.id),
			raisedHand            : this.raisedHand,
			raisedHandTimestamp   : this.raisedHandTimestamp,
			localRecordingState   : this.localRecordingState,
			recordingStateHistory : this.recordingStateHistory
		};

		return peerInfo;
	}
}



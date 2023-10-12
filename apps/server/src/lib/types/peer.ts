import { Socket } from "socket.io";
import { UserRoleType } from "./types";

export interface PeerType {
	readonly _id: string,
	readonly _roomId: string,
	_authId: null;

		readonly _socket: Socket;

		readonly _closed: boolean;

		readonly _joined: boolean;

		readonly _joinedTimestamp: number | null;

		readonly _inLobby: boolean;

		readonly _authenticated: boolean;

		readonly _authenticatedTimestamp: number | null;

		readonly _roles: UserRoleType[];

		readonly _displayName: null;

		readonly _picture: null;

		readonly _email: null;

		readonly _routerId: string | null;

		readonly _rtpCapabilities: null;

		readonly _raisedHand: boolean | null;

		readonly _raisedHandTimestamp: number | null;

		readonly _localRecordingState: null;

		readonly _recordingStateHistory: object[];

		readonly _transports: Map<any, any> | null;

		readonly _producers: Map<any, any> | null;
		readonly _consumers: Map<any, any> | null;

		readonly _handlePeer: () => void;


}
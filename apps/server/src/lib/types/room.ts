import { AwaitQueue } from "awaitqueue";
import Peer from "../Peer";
import Lobby from "../Lobby";
import type {types} from 'mediasoup'

export declare type RoomType =  {
    readonly _uuid: string;

		readonly _mediasoupWorkers: Map<string, types.Worker>;

		readonly _allPeers: Peer[];

		// Room ID.
		readonly _roomId: string;

		// Closed flag.
		readonly _closed: boolean;

		// Joining queue
		readonly _queue: AwaitQueue;

		// Locked flag.
		readonly _locked: boolean;

		// if true: accessCode is a possibility to open the room
		readonly _joinByAccessCode: boolean;

		// access code to the room,
		// applicable if ( _locked == true and _joinByAccessCode == true )
		readonly _accessCode: '';

		readonly _lobby: Lobby;

		readonly _chatHistory: [];

		readonly _fileHistory: [];

		readonly _lastN: [];

		readonly _peers: Peer[];

		readonly _selfDestructTimeout: NodeJS.Timeout;

		// Mediasoup Router instances map.
		readonly _mediasoupRouters: Map<string, types.Router>;

		// Mediasoup AudioLevelObserver instances map.
		readonly _audioLevelObservers: Map<string, types.AudioLevelObserver>;

		readonly _lastActiveSpeakerUpdateTimestamp: number;

		// Current active speaker.
		readonly _currentActiveSpeaker: null;

		readonly _handleLobby: () => void;

		readonly _handleAudioLevelObservers: () => void;

		readonly _tokens: Map<string, any>;
}
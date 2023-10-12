import Peer from "../Peer";

export interface LobbyType {
    // Closed flag.
		readonly _closed: boolean;

        readonly _roomId: string;

		readonly _peers: Peer[];
}
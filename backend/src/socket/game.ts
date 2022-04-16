import { Server, Socket } from 'socket.io';
import logger from "jet-logger";

interface Move {
    markType: string;
}

interface Moves {
    [key: string]: Move;
}

interface State {
    moves: Moves
    currentPlayerSessionId: string;
    joinedPlayerSessionId: string;
}

interface Dic {
    [key: string]: State
}

const roomToGameState : Dic = {};
class Connection {
     io: Server;
     socket: Socket;
     sessionId?: string;
    constructor(io: Server, socket: Socket) {
        this.socket = socket;
        this.io = io;
        this.sessionId = socket.handshake.headers.authorization?.replace('Session ', '');

        // Socket event that listens to new player requests to get the game moves
        socket.on('get-game-moves', (room: string) => this.emitGameMovesToSocketsInRoom(room))
        // Listen to join room (a room represents a game-link/session)
        socket.on('join', (room: string) => this.joinRoom(room));
        // Handling every move
        socket.on('player-move', (data) => this.handlePlayerMove(data))

    }

    emitGameMovesToSocketsInRoom = (room: string) => {
        this.io.sockets.in(room)
            .emit('game-join', roomToGameState[room] || {})
    }

    joinRoom (room: string) {
        this.socket.join(room)
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        this.io.to(room).emit('player-joined-room', this.sessionId)
        this.io.to(room).emit('game-join', roomToGameState[room] || {})
    }

    handlePlayerMove(data: any) {
        const { move, playerSessionId, roomId } = data;
            roomToGameState[roomId] = {
                moves: {
                    ...roomToGameState[roomId].moves,
                    [move.blockIndex]: {
                        markType: move.turnType,
                    },
                },
                currentPlayerSessionId: playerSessionId,
                joinedPlayerSessionId: roomToGameState[roomId].joinedPlayerSessionId || '',
            };
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        this.io.to(roomId).emit('player-move',
            { blockIndex: move.blockIndex, turnType: move.turnType, playerSessionId });
    }

}

function chat(io: Server) {
    io.on('connection', (socket) => {
        new Connection(io, socket);
    });
}

export const initGameState = (roomId: string, currentPlayerSessionId: string) => {
    roomToGameState[roomId] = {
        moves: {},
        currentPlayerSessionId,
        joinedPlayerSessionId: '',
    };
};

export const updateGamePlayerJoin = (roomId: string, joinedSessionId: string) => {
    roomToGameState[roomId].joinedPlayerSessionId = joinedSessionId
}

export default chat;

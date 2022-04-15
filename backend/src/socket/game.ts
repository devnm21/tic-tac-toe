import { Server, Socket } from 'socket.io';
import logger from "jet-logger";
import { parse } from "cookie";

class Connection {
     io: Server;
     socket: Socket;
    constructor(io: Server, socket: Socket) {
        this.socket = socket;
        this.io = io;
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        logger.info('session ' + socket.handshake?.session?.id);
        socket.on('message', (args) => this.sendMessage(args));


    }

    sendMessage(args: any) {
        // eslint-disable-next-line no-console
        console.log('args', args)
        logger.info('args ' + args)
        this.io.sockets.emit('message', 'hi');
    }

}

function chat(io: Server) {
    io.on('connection', (socket) => {
        new Connection(io, socket);
    });
}

export default chat;

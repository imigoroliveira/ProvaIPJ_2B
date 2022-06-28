"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RabbitmqServer = void 0;
class RabbitmqServer {
    constructor(connection, channel) {
        this.connection = connection;
        this.channel = channel;
    }
    send(queue, message) {
        this.channel.assertQueue(queue);
        this.channel.sendToQueue(queue, Buffer.from(message));
    }
    receive(queue, callback) {
        this.channel.assertQueue(queue);
        this.channel.consume(queue, (msg) => {
            if (msg) {
                callback(msg.content.toString());
            }
        });
    }
    createQueue(queue) {
        this.channel.assertQueue(queue);
    }
    // create singleton
    static getInstance(connection, channel) {
        if (!RabbitmqServer.instance) {
            if (connection && channel) {
                RabbitmqServer.instance = new RabbitmqServer(connection, channel);
            }
        }
        return RabbitmqServer.instance;
    }
}
exports.RabbitmqServer = RabbitmqServer;

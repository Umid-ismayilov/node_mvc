const {Server} = require("socket.io");
const socketMiddleware = require('../middlewares/socket')

const connection = (http) => {
    const io = new Server(http);
    socketMiddleware(io);
    return io.on('connection', (socket) => {
        console.log('user connection');
        // console.log(socket.handshake.auth);
        // console.log(socket.handshake.query);
        socket.on('chat message', (msg) => {
            console.log('message: ' + msg);
        });
        socket.on('disconnect', () => {
            console.log('user disconnected');
        });
    });

}
module.exports = {
    connection:connection,
}
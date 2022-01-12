
const io = (http) => {
    const { Server } = require("socket.io");
    const io = new Server(http);
    return io.on('connection', (socket) => {
        console.log('a user connected');
    });

}

module.exports = {
    io:io,
}
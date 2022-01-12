const socket = (io)=>{
    io.use((socket, next) => {
        const req_token    = socket.handshake.auth.token;
        const static_token = "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";
        if (req_token==static_token) {
            next();
        } else {
            next(new Error("invalid"));
        }
    });
}

module.exports = socket;
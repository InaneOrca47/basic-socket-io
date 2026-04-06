const http = require('http');
const { Server } = require('socket.io');

let io;

const handleChatMessage = (socket, msg) => {
    socket.rooms.forEach(room => {
        if (room === socket.id) return;
        socket.to(room).emit('chat message', msg);
    })
}

const handleRoomChange = (socket, roomName) => {
    socket.rooms.forEach(room => {
        if (room === socket.id) return;
        socket.leave(room);
    })

    socket.join(roomName);
}
const socketSetup = (app) => {
    const server = http.createServer(app);
    io = new Server(server);

    io.on('connection', (socket) => {
        console.log('A user connected');
        socket.join('general');

        socket.on('disconnect', () => {
            console.log('A user disconnected');
        });

        socket.on('chat message', (msg) => { handleChatMessage(socket, msg) });
        socket.on('room change', (room) => { handleRoomChange(socket, room) });
    });

    return server;
}

module.exports = socketSetup;
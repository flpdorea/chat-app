const express = require('express');
const socketio = require('socket.io');
const http = require('http');

const PORT = process.env.PORT || 5000;

const router = require('./router');

const app = express();
const server = http.createServer(app);
const io = socketio(server);

app.use(router);

io.on('connection', (socket) => {
	socket.on('join', (arg, callback) => {
		console.log(`User ${arg.name} has connected to room ${arg.room}!`);
		callback('got it');
	});

	socket.on('disconnect', () => {
		console.log('A user has disconnected!');
	});
});

server.listen(PORT, () => console.log(`Server has started on port ${PORT}`));

import React, { useState, useEffect } from 'react'
import io from 'socket.io-client'

let socket

const Chat = () => {
	const [name, setName] = useState('')
	const [room, setRoom] = useState('')
	const ENDPOINT = 'localhost:5000'

	useEffect(() => {
		const queryString = window.location.search
		const urlParams = new URLSearchParams(queryString)

		const name = urlParams.get('name')
		const room = urlParams.get('room')

		setName(name)
		setRoom(room)

		socket = io(ENDPOINT, { transports: ['websocket'] })

		console.log(`Name: ${name}`)
		console.log(`Room: ${room}`)
		console.log(socket)

		socket.emit('join', { name, room }, (response) => {
			console.log(response);
		});

		return () => {
			socket.emit('disconnect')
			socket.off()
		}
	}, [])

	return <h1>Chat</h1>
};

export default Chat

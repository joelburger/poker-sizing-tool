import { writable } from 'svelte/store';

const room = writable({});
let socket;

async function sendMessage(socketUrl, message) {
	const socket = await fetchSocket(socketUrl);
	socket.send(JSON.stringify(message));
}

async function fetchSocket(socketUrl) {

	return new Promise((resolve, reject) => {

		try {
			console.log('WebSocket URL:', socketUrl);

			if (socket && socket.readyState === WebSocket.OPEN) {
				resolve(socket);
			}

			socket = new WebSocket(socketUrl);
			socket.onopen = () => {
				console.log('WebSocket opened');
				resolve(socket);
			};

			socket.onmessage = (message) => {
				const { eventType, payload } = JSON.parse(message.data);
				console.log({ eventType, payload });

				if (eventType === 'room-update') {
					console.log('room-update', payload);
					room.set(payload);
				}
			};

			socket.onerror = (error) => {
				console.error('WebSocket error:', error);
			};

			socket.onclose = (event) => {
				console.log('WebSocket closed:', event.reason);
			};

		} catch (error) {
			console.error('Error constructing websocket:', error);
			reject(error);
		}
	});

}

export { room, sendMessage };

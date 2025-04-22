import { writable } from 'svelte/store';

const room = writable({});
let socket;

function fetchSocket(socketUrl) {
	console.log('Socket URL:', socketUrl);

	if (socket) {
		return socket;
	}

	socket = new WebSocket(socketUrl);
	socket.onopen = () => {
		console.log('Socket opened');
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

	return socket;
}

export { room, fetchSocket };

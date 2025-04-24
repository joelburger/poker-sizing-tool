import { writable } from 'svelte/store';

const room = writable({});
let socket;

function fetchSocket(socketUrl) {
	console.log('WebSocket URL:', socketUrl);

	if (socket && socket.readyState === WebSocket.OPEN) {
		return socket;
	}

	socket = new WebSocket(socketUrl);
	socket.onopen = () => {
		console.log('WebSocket opened');
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

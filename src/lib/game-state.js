const socket = new WebSocket('http://localhost:8080');
let room = {};

socket.onopen = () => {
	console.log('Socket opened');
};

socket.onmessage = (message) => {
	console.log('message.data', message.data);
	const { eventType, payload } = JSON.parse(message.data);
	console.log( { eventType, payload } );

	if (eventType === 'room-update') {
		console.log('room-update', payload);
		room = payload;
	}
};

socket.onerror = (error) => {
	console.error('WebSocket error:', error);
};

socket.onclose = (event) => {
	console.log('WebSocket closed:', event.reason);
};

export { room, socket };

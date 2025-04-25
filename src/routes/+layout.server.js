export const load = async () => {
	return {
		WS_SERVER_URL: process.env.WS_SERVER_URL || 'http://localhost:8080',
	};
};

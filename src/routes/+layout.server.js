import QRCode from 'qrcode';

async function generateQrCode(request) {
	try {
		return QRCode.toDataURL(request.url.toString());
	} catch (err) {
		console.error('Failed to fetch QR Code', err);
	}
}

function validateSessionId(sessionId) {
	const sessionIdRegex = /^[a-zA-Z0-9-]+$/;
	if (!sessionIdRegex.test(sessionId)) {
		throw new Error('Invalid session ID: Only letters, numbers, and dashes are allowed.');
	}
}

export const load = async (request) => {
	const qrCode = await generateQrCode(request);

	const { session_id } = request.params;

	validateSessionId(session_id);

	return {
		SESSION_ID: session_id,
		WS_SERVER_URL: process.env.WS_SERVER_URL || 'http://localhost:8080',
		QR_CODE: qrCode,
		REQUEST_URL: request.url.toString()
	};
};

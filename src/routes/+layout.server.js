import QRCode from 'qrcode';

async function generateQrCode(request) {
	try {
		return QRCode.toDataURL(request.url.toString());
	} catch (err) {
		console.error('Failed to fetch QR Code', err);
	}
}

export const load = async (request) => {
	const qrCode = await generateQrCode(request);

	const { session_id } = request.params;

	return {
		SESSION_ID: session_id,
		WS_SERVER_URL: process.env.WS_SERVER_URL || 'http://localhost:8080',
		QR_CODE: qrCode,
		REQUEST_URL: request.url.toString()
	};
};

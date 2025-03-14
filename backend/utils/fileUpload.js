const uploadContract = async file => {
	try {
		// Return a relative path that can be served via Express
		const relativeFilePath = `/uploads/partner/${file.filename}`;
		return relativeFilePath;
	} catch (error) {
		console.error('Error preparing file path:', error);
		throw new Error('Failed to process uploaded file');
	}
};

module.exports = { uploadContract };

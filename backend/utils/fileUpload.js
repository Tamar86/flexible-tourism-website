const uploadPartnerDocument = async file => {
	try {
		// Return a relative path that can be served via Express
		const relativeFilePath = `/uploads/partner/${file.filename}`;
		return relativeFilePath;
	} catch (error) {
		console.error('Error preparing file path:', error);
		throw new Error('Failed to process uploaded file');
	}
};

const uploadCustomerDocuments = async file => {
	try {
		// Return a relative path that can be served via Express
		const relativeFilePath = `/uploads/customer/${file.filename}`;
		return relativeFilePath;
	} catch (error) {
		console.error('Error preparing file path:', error);
		throw new Error('Failed to process uploaded file');
	}
};

const uploadBookingDocuments = async file => {
	try {
		// Return a relative path that can be served via Express
		const relativeFilePath = `/uploads/booking/${file.filename}`;
		return relativeFilePath;
	} catch (error) {
		console.error('Error preparing file path:', error);
		throw new Error('Failed to process uploaded file');
	}
};

const uploadEmployeeDocuments = async file => {
	try {
		// Return a relative path that can be served via Express
		const relativeFilePath = `/uploads/employee/${file.filename}`;
		return relativeFilePath;
	} catch (error) {
		console.error('Error preparing file path:', error);
		throw new Error('Failed to process uploaded file');
	}
};

module.exports = {
	uploadPartnerDocument,
	uploadCustomerDocuments,
	uploadBookingDocuments,
	uploadEmployeeDocuments,
};

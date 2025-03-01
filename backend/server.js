const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const mongoose = require('mongoose');

// Initialize dotenv for environment variables
dotenv.config();

// Initialize the app
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

//routes
const adminEmployeeRoutes = require('./routes/admin/adminEmployeeRoutes');
const adminBookingRoutes = require('./routes/admin/adminBookingRoutes');
const adminPartnerRoutes = require('./routes/admin/adminPartnerRoutes');
const adminTourRoutes = require('./routes/admin/adminTourRoutes');
const uploadImageRoutes = require('./routes/admin/imageUploadRoutes');
const deleteImageRoutes = require('./routes/admin/imageDeleteRoutes');
const authRoutes = require('./routes/admin/adminAuthRoutes');

app.use('/api/admin/employees', adminEmployeeRoutes);
app.use('/api/admin/bookings', adminBookingRoutes);
app.use('/api/admin/partners', adminPartnerRoutes);
app.use('/api/admin/tours', adminTourRoutes);
app.use('/api/admin', uploadImageRoutes);
app.use('/api/admin', deleteImageRoutes);
app.use('/api/admin', authRoutes);

// Connect to MongoDB
mongoose
	.connect(process.env.MONGO_URI, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	})
	.then(() => console.log('Connected to MongoDB'))
	.catch(err => console.error('MongoDB connection error:', err));

// Set the port
const PORT = process.env.PORT || 5000;

// Start the server
app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});

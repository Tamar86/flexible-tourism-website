const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const AdminAuth = require('../../models/admin/AdminAuth'); // your Admin model
const router = express.Router();

// Admin Registration Route

router.post('/register', async (req, res) => {
	const { email, password } = req.body;
	try {
		const adminExists = await AdminAuth.findOne({ email });
		if (adminExists) {
			return res.status(400).json({ message: 'Admin already exists' });
		}
		const admin = new AdminAuth({ email, password });
		await admin.save();
		res.status(201).json({ message: 'Admin registered successfully', email });
	} catch (error) {
		res.status(500).json({ message: 'Server error', error: error.message });
	}
});

router.post('/login', async (req, res) => {
	const { email, password } = req.body;
	try {
		const admin = await AdminAuth.findOne({ email });
		if (!admin) {
			return res.status(400).json({ message: 'Invalid email or password' });
		}

		const isMatch = await admin.matchPassword(password);
		if (!isMatch) {
			return res.status(400).json({ message: 'Invalid email or password' });
		}
		const token = jwt.sign({ adminId: admin._id }, process.env.JWT_SECRET, {
			expiresIn: '1h', // Token expires in 1 hour
		});
		res.status(200).json({
			message: 'Login successful',
			token,
		});
	} catch (error) {
		res.status(500).json({ message: 'Server error', error: error.message });
	}
});

module.exports = router;

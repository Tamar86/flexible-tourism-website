const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const adminAuthSchema = new mongoose.Schema(
	{
		email: {
			type: String,
			required: true,
			unique: true,
		},
		password: {
			type: String,
			required: true,
		},
	},
	{ timestamps: true },
);

//Pre-save middleware: Hashes the password before saving it.

adminAuthSchema.pre('save', async function (next) {
	if (!this.isModified('password')) return next();

	const salt = await bcrypt.genSalt(10);
	this.password = await bcrypt.hash(this.password, salt);
});

// matchPassword method: Compares the entered password with the hashed password.

adminAuthSchema.methods.matchPassword = async function (enteredPassword) {
	return await bcrypt.compare(enteredPassword, this.password);
};

const AdminAuth = mongoose.model('Admin', adminAuthSchema);

module.exports = AdminAuth;

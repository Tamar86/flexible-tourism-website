const express = require('express');
const { uploadCustomerDocument } = require('../../middlewares/multer');
const router = express.Router();
const adminCustomerController = require('../../controllers/admin/adminCustomerController');

router.get('/all', adminCustomerController.getAllCustomers);

router.get('/customer/:id', adminCustomerController.getCustomer);

// Partner creation with file upload
router.post(
	'/new',
	uploadCustomerDocument.array('documents', 5), // Allows up to 5 files

	adminCustomerController.createCustomer,
);

//EDIT PARTNER

router.patch(
	'/update/:id',
	uploadCustomerDocument.array('documents', 5),

	adminCustomerController.updateCustomer,
);

//DELETE PARTNER

router.delete('/delete/:id', adminCustomerController.deleteCustomer);

//DELETE DOCUMENT
router.delete(
	'/delete-document',
	adminCustomerController.deleteCustomerDocument,
);

module.exports = router;

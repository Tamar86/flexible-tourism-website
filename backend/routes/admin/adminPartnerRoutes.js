//

const express = require('express');
const { upload } = require('../../middlewares/multer');
const router = express.Router();
const adminPartnerController = require('../../controllers/admin/adminPartnerController');

router.get('/all', adminPartnerController.getAllPartners);
router.get('/partner/:id', adminPartnerController.getPartner);

// Partner creation with file upload
router.post(
	'/new',
	upload.array('contractDocuments', 5), // Allows up to 5 files

	adminPartnerController.createPartner,
);

//EDIT PARTNER

router.patch(
	'/update/:id',
	upload.array('contractDocuments', 5),

	adminPartnerController.updatePartner,
);

//DELETE PARTNER

router.delete('/delete/:id', adminPartnerController.deletePartner);

//DELETE DOCUMENT
router.delete('/delete-document', adminPartnerController.deleteDocument);

module.exports = router;

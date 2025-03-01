const express = require('express');
const router = express.Router();
const adminPartnerController = require('../../controllers/admin/adminPartnerController');

router.get('/partners', adminPartnerController.getAllPartners);

router.post('/new-partner', adminPartnerController.createPartner);

router.patch('/update/:id', adminPartnerController.updatePartner);

router.delete('/delete/:id', adminPartnerController.deletePartner);

module.exports = router;

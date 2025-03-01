const express = require('express');
const router = express.Router();
const AdminDashboardStatsController = require('../../controllers/admin/adminDashboardStatsController');

router.get('/stats', adminPartnerController.getAllPartners);

router.post('/new-stat', adminPartnerController.createPartner);

router.patch('/update/:id', adminPartnerController.updatePartner);

router.delete('/delete/:id', adminPartnerController.deletePartner);

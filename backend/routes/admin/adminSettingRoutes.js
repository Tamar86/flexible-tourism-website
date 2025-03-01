const express = require('express');
const router = express.Router();
const adminSettingController = require('../../controllers/admin/adminSettingsController');

router.get('/settings', adminSettingController.getAllSettings);

router.post('/new-setting', adminSettingController.createSetting);

router.patch('/update/:id', adminSettingController.updateSetting);

router.delete('/delete/:id', adminSettingController.deleteSetting);

module.exports = router;

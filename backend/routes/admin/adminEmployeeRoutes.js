const express = require('express');
const router = express.Router();
const adminEmployeeController = require('../../controllers/admin/adminEmployeeController');
const protect = require('../../middlewares/auth');

//route to get all employees
router.get('/all', adminEmployeeController.getAllEmployees);

//route to single employee

router.get('/employee/:id', adminEmployeeController.getEmployee);

// Route to create a new employee
router.post('/new', adminEmployeeController.createEmployee);

router.patch(
	'/update/:id',

	adminEmployeeController.partialUpdateOfEmployee,
);

router.delete('/delete/:id', adminEmployeeController.deleteEmployee);

module.exports = router;

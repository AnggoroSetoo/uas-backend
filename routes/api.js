// import EmployeeController

const EmployeeController = require('../controllers/EmployeeController');

// import express
const express = require("express");

// membuat object router
const router = express.Router();

/**
 * Membuat routing
 */
router.get("/", (req, res) => {
  res.send("Hello HRD API Express");
});

// Membuat routing employee
router.get('/employees', EmployeeController.index);
router.post('/employees', EmployeeController.store);
router.put('/employees/:id', EmployeeController.update);
router.delete('/employees/:id', EmployeeController.destroy);
router.get('/employees/:id', EmployeeController.show);

// // Search employees berdasarkan name
router.get('/employees/search/:name', EmployeeController.search);

// // Filter employees berdarsarkan status active, inactive, terminated
router.get('/employees/status/active', EmployeeController.getActiveEmployees); // Active
router.get('/employees/status/inactive', EmployeeController.getInactiveEmployees); // Inactive
router.get('/employees/status/terminated', EmployeeController.getTerminatedEmployees); // Terminated


// export router
module.exports = router;

const express = require('express');
const router = express.Router();
const { getStudents, getStudent, addStudent, updateStudent, deleteStudent } = require('../controllers/studentController');

// Route to fetch all students
router.get('/students', getStudents);

// Route to fetch one students
router.get('/student/:id', getStudent);

// Route to add a new student
router.post('/students', addStudent);

// Route to update an existing student
router.put('/students/:id', updateStudent);

// Route to delete a student
router.delete('/students/:id', deleteStudent);

module.exports = router;
const express = require('express');
const Student = require('../models/studentSchema');
const Subject = require('../models/subjectSchema');

// Fetch all students
const getStudents = async (req, res) => {
    const students = await Student.find().populate('subject')
        .then((studentData) => {
            console.log(studentData);
            res.status(200).json({ success: true, results: studentData });
        })
        .catch((error) => {
            console.log(error);
            res.status(500).json({ success: false, message: 'Students data retrieval failed' });
        })
}

// Fetch one student with id
const getStudent = async (req, res) => {
    const { id } = req.params
    const students = await Student.findById(id).populate('subject')
        .then((studentData) => {
            console.log(studentData);
            res.status(200).json({ success: true, result: studentData });
        })
        .catch((error) => {
            console.log(error);
            res.status(500).json({ success: false, message: 'Student data retrieval failed' });
        })
}

// Create a student
const addStudent = async (req, res) => {
    console.log(req.body);
    const { studentName, subjectName, grade } = req.body;
    const subject = await Subject.create({ subjectName });
    const remarks = grade >= 75 ? "PASS" : "FAIL";
    Student.create({
        studentName,
        subject: subject._id,
        grade,
        remarks
    })
        .then((createdStudent) => {
            console.log(createdStudent);
            res.status(201).json({ success: true, message: 'Student created cuccessfully' });
        })
        .catch((error) => {
            console.log(error);
            res.status(500).json({ success: false, message: 'Student creation failed' });
        })
}


// Update a student
const updateStudent = async (req, res) => {

    const { id } = req.params;
    const { studentName, subjectName, grade } = req.body;

    const remarks = grade >= 75 ? "PASS" : "FAIL";
    const updatedStudent = await Student.findByIdAndUpdate(id, { studentName, grade, remarks }, { new: true });

    if (!updatedStudent) {
        return res.status(404).json({ success: false, message: 'Student not found' });
    }

    Subject.findOneAndUpdate({ _id: updatedStudent.subject }, { subjectName }, { new: true })
        .then((result) => {
            console.log(result);
            res.status(200).json({ success: true, message: 'Student updated successfully' });
        })
        .catch((error) => {
            console.log(error);
            res.status(500).json({ success: false, message: 'Student updation failed.' });
        })
};

// Delete a student
const deleteStudent = async (req, res) => {

    const { id } = req.params;

    const deletedStudent = await Student.findByIdAndDelete(id);

    if (!deletedStudent) {
        return res.status(404).json({ success: false, message: 'Student not found' });
    }

    Subject.findByIdAndDelete(deletedStudent.subject)
        .then((result) => {
            console.log(result);
            res.status(200).json({ success: true, message: 'Student deleted successfully' });
        })
        .catch((error) => {
            console.log(error);
            res.status(500).json({ success: false, message: 'Student deletion failed.' });
        })
};


module.exports = { getStudents, getStudent, addStudent, updateStudent, deleteStudent };

const mongoose = require('mongoose');

// Student Schema and Model
const studentSchema = new mongoose.Schema({
    studentName: { type: String, required: true },
    subject: { type: mongoose.Schema.Types.ObjectId, ref: 'Subject', required: true },
    grade: { type: Number, required: true },
    remarks: { type: String, required: true }
});

const studentModel = mongoose.model('Student', studentSchema);

module.exports = studentModel;

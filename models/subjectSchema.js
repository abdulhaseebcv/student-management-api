const mongoose = require('mongoose');

// Subject Schema and Model
const subjectSchema = new mongoose.Schema({
    subjectName: { type: String, required: true }
});

const subjectModel = mongoose.model('Subject', subjectSchema);

module.exports = subjectModel;

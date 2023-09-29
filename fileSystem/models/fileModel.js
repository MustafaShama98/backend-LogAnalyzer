const mongoose = require("mongoose");
const fileSchema = mongoose.Schema({
    user_name: String,
    file_date: Date,
    date: Date,
    info: String
});

module.exports = fileSchema
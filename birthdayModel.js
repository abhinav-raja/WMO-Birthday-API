const mongoose = require("mongoose");

//Create schema and model
let birthdaySchema = new mongoose.Schema({
    name: {type: String, required: true},
    birthday: {type: Date, required: true}
});
let birthdayModel = new mongoose.model('birthday', birthdaySchema);

module.exports = birthdayModel;
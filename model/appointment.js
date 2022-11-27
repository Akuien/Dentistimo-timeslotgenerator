var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var appointmentSchema = new Schema({
    id : { type : String , required : true },
    time : { type : String , required : true },
    date : { type : String, required : true },
    issuance : { type : String , required : true },
    description : { type : String , required : true }
});

module.exports = mongoose.model('Appointment', appointmentSchema);
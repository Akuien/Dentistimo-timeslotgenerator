var mongoose = require('mongoose');


const appointmentSchema = new mongoose.Schema(
    {

    userid : { 
        type : String ,
         required : true },

    dentistid : { 
        type : Number , 
        required : true },
    time : { 
        type : String ,
         required : true },
    date : { 
        type : String, 
        required : true },
    day : {
         type : String ,
         required : true }

});

module.exports = mongoose.model('appointment', appointmentSchema);
const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema(
    {
        appointments: [{
            type: String,
            ref: 'BookingModel'
        }],
        description: {  //Brief explanation about the purpose of the appointment
            type: String,
            required: true,
            unique: true
        },
        user: {
            type: mongoose.Schema.Types.ObjectId, 
            ref: "users"
        },
        date: {
            day: { 
                type: Number,
                min: 1,
                max: 31
            },
            month: {
                type: Number, 
                min: 1,  
                max: 12
            
            },
            year: {
                type: Number,
                min: new Date().getFullYear(),
                max: new Date().getFullYear() + 1
            }

        },
        start: {
            type: String,
            required: true,
        },
        end: {
            type: String,
            required: true
        },
        dentist: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: "dentists"

        },
        issuance: {
            type:String,
            required: true
        }
    },
);

module.exports = mongoose.model("bookingmodels", bookingSchema);
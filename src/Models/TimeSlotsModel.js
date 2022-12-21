const mongoose = require('mongoose');

const timeslotSchema = new mongoose.Schema(

    {
        dentistid: {
            type: String,
            required: true,
            ref: "dentists",
        },
        name: {
            type: String,
            required: true,
            ref: "dentists",
        },
        dentistsNumber: {
        type: Number,
        required: true,
        ref: "dentists",
    },
    openinghour: {
        type: Number,
        required: true
    },
    closinghour: {
        type: Number,
        required: true
    },
    day: {
        type: String,
        required: true
    },
        timeSlots: [
            {
              type: String,
              ref: "timeSlots",
            },
          ],
    }, {
});

module.exports = mongoose.model("timeSlots", timeslotSchema);
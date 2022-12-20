var db = require("../Database")
var timeslotGenerator = require("./timeslots")
const Appointment = require("../Models/AppointmentModel");


/* 
let topic = "appointment/getAllTimeslots";

mqtt.subscribe("appointment/getAllTimeslots");
db.connect;

function gettimeSlots(topic, payload) {
    if(topic == "appointment/getAllTimeslots"){
    Appointment.find({dentistid : payload.dentistid , date : payload.date},function(err,appointment){
            let result = timeslotGenerator.alltimeSlots.then(a => {
                let item = a.filter(function(e){
                    e.date = payload.date;
                    return e.day == payload.day && e.id == payload.dentistid
                })
                try {
                var timeSlots=[]
                timeSlots = item[0].timeSlots
                console.log(appointment);
             mqtt.publish(`sendTimeSlots` ,JSON.stringify(item[0]));
             }catch(error){
              console.log(error.message);
                }
            })
        })
    }
} 



module.exports.gettimeSlots = gettimeSlots;
*/
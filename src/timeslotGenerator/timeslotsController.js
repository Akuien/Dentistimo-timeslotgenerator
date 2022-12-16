var db = require("../Database")
var timeslotGenerator = require("./timeslots")
var BookingModel = require("../Models/BookingModel")
var mqtt = require("../main")


mqtt.subscribe("appointment/getAllTimeslots");
db.connect;


/* let timeslotsTopic= "appointment/getAllTimeslots"

function sendTimeslots(timeslots, clinicId) {
    mqtt.publish(timeslotsTopic, JSON.stringify({
        timeSlots: timeslots,
        clinicId: clinicId,
      }), {qos:1}
    );
    console.log("Timeslots are valid");
  }
   */

function gettimeSlots(topic, payload) {
    if(topic == "appointment/getAllTimeslots"){
    BookingModel.find({dentistid : payload.dentistid , date : payload.date},function(err,appointment){
            let result = timeslotGenerator.alltimeSlots.then(a => {
                let item = a.filter(function(e){
                    e.date = payload.date;
                    return e.day == payload.day && e.id == payload.dentistid
                })
                try {
                var timeSlots=[]
                timeSlots = item[0].timeSlots
                console.log(appointment);
             mqtt.publish(`sendTimeSlots` ,JSON.stringify(appointments));
             }catch(error){
              console.log(error.message);
                }
            })
        })
    }
}

module.export= {
    gettimeSlots
}
 

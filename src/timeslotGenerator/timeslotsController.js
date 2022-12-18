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

mqtt.ee.on("message", function(topic, payload) {
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
                for (let i=0 ; i<timeSlots.length ; i++){
                    var counter = 0
                    var time = ""
                    var appj = 0;
                    for(let j=0 ; j<appointment.length ; j++){
                    if(item[0].timeSlots[i] === appointment[j].time) {
                    counter = counter + 1;
                    console.log(counter);
                    time = appointment[j].time
                    if (counter >= item[0].dentistsNumber){
                    var index = item[0].timeSlots.indexOf(time);
                    if(index > -1){
                    item[0].timeSlots.splice(i,1)
                    }
                }
            }
        } 
    }
        item[0].requestid = payload.requestid;
             mqtt.publish(`sendTimeSlots` ,JSON.stringify(item[0]));
             console.log(item[0]);
             }catch(error){
              console.log(error.message);
                }
            })
        })
    }
})

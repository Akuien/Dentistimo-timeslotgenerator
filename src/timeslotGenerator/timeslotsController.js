var db = require("../Database")
var timeslotGenerator = require("./timeslots")
var BookingModel = require("../Models/BookingModel")

/* 
let topic = "appointment/getAllTimeslots";

mqtt.subscribe("appointment/getAllTimeslots");
db.connect;

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
             mqtt.publish(`sendTimeSlots` ,JSON.stringify(item[0]));
             }catch(error){
              console.log(error.message);
                }
            })
        })
    }
} 

 */

db.connect;
let topic = "appointment/getAllTimeslots";
let response= "sendTimeSlots"

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
              for (let i=0 ; i<timeSlots.length ; i++){
                  var slot = ""
                  var counter = 0
                  for(let j=0 ; j<appointment.length ; j++){
                  if(item[0].timeSlots[i] === appointment[j].slot) {
                  counter = counter + 1;
                  console.log(counter);
                  slot = appointment[j].slot
                  if (counter >= item[0].dentistsNumber){
                  var index = item[0].timeSlots.indexOf(slot);
                  if(index > -1){
                  item[0].timeSlots.splice(i,1)
                  console.log(item[0])
                  }
              }
          }   
      } 
  }
      item[0].requestid = payload.requestid;
      let slots = JSON.stringify(item[0]);
           client.publish('sendTimeSlot' ,slots, { qos: 1, retain: false });
           console.log(item[0]);
           }catch(error){
            console.log(error.message);
              }
          })
      })
  }
} 

module.exports.gettimeSlots = gettimeSlots;

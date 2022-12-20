var mqtt = require('mqtt');
// const path = require('path')
// require('dotenv').config({ path: path.resolve(__dirname, '.env') })
const Appointment = require("./Models/AppointmentModel");
var db = require("./Database")
var timeslotGenerator = require("./timeslotGenerator/timeslots")
// var timeslotController = require("./timeslotGenerator/timeslotsController")

db.connect;

const options = {
  host: '45fb8d87df7040eb8434cea2937cfb31.s1.eu.hivemq.cloud',
  port: 8883,
  protocol: 'mqtts',
  username: 'Team5@Broker',
  password: 'Team5@Broker'
}

const client = mqtt.connect(options)


client.on('connect', function () {
    console.log('Connected Successfully');
});

client.on('error', function (error) {
    console.log(error);
});


client.on('message', function (topic, message) {
  console.log(String.fromCharCode.apply(null, message)); 
});

function publish(topic,message){
    client.publish(topic, message, {
      qos: 2
    });
  }

  client.on("connect", () => {
    client.subscribe([topic], () => {
      console.log(`Subscribed to ${topic}`);
    });
  });

  timeslotGenerator.createAppointment;


  let topic = "appointment/getAllTimeslots";
  let response1 = "sendTimeSlots"
  
  function gettimeSlots(topic, payload) {
    if(topic == "appointment/getAllTimeslots"){
      Appointment.find({dentistid : payload.dentistid , date : payload.date},
          function(err,appointment){
            let result = timeslotGenerator.alltimeSlots.then(app => {
                let item = app.filter(function(appj){
                    appj.date = payload.date;
                    return appj.day == payload.day && appj.id == payload.dentistid
                })
                try {
                var timeSlots = []
                timeSlots = item[0].timeSlots
                console.log(appointment);
                for (let i=0 ; i<timeSlots.length ; i++){
                    var slot = ""
                    var counter = 0
                    for(let j=0 ; j<appointment.length ; j++){
                    if(item[0].timeSlots[i] === appointment[j].slot) {
                    counter = counter + 1;
  
                    slot = appointment[j].slot
                    if (counter >= item[0].dentistsNum){
                    var index = item[0].timeSlots.indexOf(slot);
                    if(index > -1){
                    item[0].timeSlots.splice(i,1)
                   // console.log(item[0])
                    }
                }
            }   
        } 
    }
        let slots = JSON.stringify(item[0]);
             client.publish(response1, slots, { qos: 1, retain: false });
             console.log(item[0]);
             }catch(error){
              console.log(error.message);
                }
            })
        })
    }
  } 
  
  module.exports.gettimeSlots = gettimeSlots;
  
module.exports= {

    publish(topic,message){
      publish(topic,message)
    },
    subscribe(topic){
      subscribe(topic)
    },
  
    client:client,
  }
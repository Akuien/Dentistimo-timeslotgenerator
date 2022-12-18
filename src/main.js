var mqtt = require('mqtt');
const path = require('path')
require('dotenv').config({ path: path.resolve(__dirname, '.env') })


var db = require("./Database")
var timeslotGenerator = require("./timeslotGenerator/timeslots")
var BookingModel = require("./Models/BookingModel");
db.connect;

// initialize the MQTT client
const client = mqtt.connect({
    host: process.env.HOST,
    port: process.env.PORT,
    protocol: 'mqtts',
    username: process.env.USERNAME,
    password: process.env.PASSWORD
  })



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

  function subscribe(topic){
    client.on("connect", () => {
      console.log(" connected!!!");
      client.subscribe(topic, { qos: 2 });})
  }


client.subscribe("appointment/getAllTimeslots");
db.connect;


client.on("message", function(topic, payload) {
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
             client.publish(`sendTimeSlots/${payload.request}` ,JSON.stringify(item[0]));
             console.log(item[0]);
             }catch(error){
              console.log(error.message);
                }
            })
        })
    }
})

module.exports= {

    publish(topic,message){
      publish(topic,message)
    },
    subscribe(topic){
      subscribe(topic)
    },
  
    client:client

  }
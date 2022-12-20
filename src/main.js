var mqtt = require('mqtt');
const path = require('path')
require('dotenv').config({ path: path.resolve(__dirname, '.env') })


var db = require("./Database")
var timeslotGenerator = require("./timeslotGenerator/timeslots")
var timeslotController = require("./timeslotGenerator/timeslotsController")
var BookingModel = require("./Models/BookingModel");
db.connect;

const options = {
  host: '45fb8d87df7040eb8434cea2937cfb31.s1.eu.hivemq.cloud',
  port: 8883,
  protocol: 'mqtts',
  username: 'Team5@Broker',
  password: 'Team5@Broker'
}

const client = mqtt.connect(options)

client.on("message", function(topic, message) {
  try{
  console.log(message)
  var stringMessage = message.toString();
  var jsonMessage = JSON.parse(stringMessage);
  ee.emit('messageArrived',topic, jsonMessage);
  }catch(error){
    console.log(error.message);
  }
});

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

let topic = "appointment/getAllTimeslots"
  client.on("connect", () => {
    console.log("Connected Now!");
    client.subscribe([topic], () => {
      console.log(`Subscribed to ${topic}`);
    });
  });

  timeslotGenerator.createAppointment();


  client.on("message", (topic, payload) => {
    console.log(payload.toString());
    timeslotController.gettimeSlots(topic, payload);
  });



module.exports= {

    publish(topic,message){
      publish(topic,message)
    },
    subscribe(topic){
      subscribe(topic)
    },
  
    client:client,
  }
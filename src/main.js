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


// setup the callbacks
client.on('connect', function () {
    console.log('Connected Successfully');
});

client.on('error', function (error) {
    console.log(error);
});


client.on('message', function (topic, message) {
    // called each time a message is received
    console.log('Received message:', topic, message.toString());
});

function publish(topic,message){
    client.publish(topic, message, {
      qos: 2
    });
  }

  function subscribe(topic){
    client.on("connect", () => {
      console.log("Client:" + clientId + " connected!");
      client.subscribe(topic, { qos: 2 });})
  }

  
  
module.exports={
    publish(topic,message){
      publish(topic,message)
    },
    subscribe(topic){
      subscribe(topic)
    },
    client:client,
  
  }
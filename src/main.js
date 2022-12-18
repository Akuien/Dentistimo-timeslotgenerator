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


  var EventEmitter = require('events')

  var ee = new EventEmitter()
  ee.on('message', function (text) {
    console.log(text)
  })
  ee.emit('message', 'hello world')


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

module.exports= {

    publish(topic,message){
      publish(topic,message)
    },
    subscribe(topic){
      subscribe(topic)
    },
    ee: ee,
    client:client

  }
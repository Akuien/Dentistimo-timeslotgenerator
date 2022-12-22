var mqtt = require('mqtt');
// const path = require('path')
// require('dotenv').config({ path: path.resolve(__dirname, '.env') })
const TimeSlotsModel = require("./Models/TimeSlotsModel");
var db = require("./Database")
var timeslotGenerator = require("./timeslotGenerator/timeslots")

db.connect;


// MQTT Connection
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
    client.subscribe([topic1], () => {
      console.log(`Subscribed to ${topic1}`);
    });
  });

  timeslotGenerator.createAppointment;

  let topic1 = "appointment/getAllTimeslots";


  function gettimeSlots(topic, payload) {
    if(topic == "appointment/getAllTimeslots"){
      TimeSlotsModel.find({dentistid : payload.dentistid , name : payload.name},
          function(err,t){
                try {
                var timeSlots = []
                timeSlots = item[0].timeSlots
                for (let i=0 ; i<timeSlots.length ; i++){
                  var appj = 0;
                    var slot = ""
                    var counter = 0
                    for(let j=0 ; j<t.length ; j++){
                    if(item[0].timeSlots[i] === t[j].slot) {
                    counter = counter + 1;
                    slot = t[j].slot
                    if (counter >= item[0].dentistsNumber){
                    var index = item[0].timeSlots.indexOf(slot);
                    if(index > -1){
                      timeSlots = item[0].timeSlots.splice(i,1)
                    }
                }
            }   
        } 
    } let slots = JSON.stringify(timeSlots);
             client.publish('sendTimeSlots', slots , { qos: 1, retain: false });
             console.log(item[0]);
             }catch(error){
              console.log(error.message);
                }
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
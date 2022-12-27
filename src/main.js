var mqtt = require('mqtt');
const Timeslots = require("./Models/TimeSlotsModel");
const Booking = require("./Models/BookingModel");
var timeslotGenerator = require("./timeslotGenerator/timeslots")
var db = require("./Database")
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



  // setup the callbacks
  client.on('connect', function () {
    console.log('Connected Successfully');
    console.log('Listening...');
  });
  
  client.on('error', function (error) {
    console.log(error);
  });


client.on('message', function (topic, message) {
  console.log(String.fromCharCode.apply(null, message)); 
});


  timeslotGenerator.alltimeSlots;


  let topic = "dentist/getTimeslots";


  client.on("message", (topic, payload) => {
    console.log('Received message here:', topic, payload.toString());
    console.log(payload.toString());
  });



   client.subscribe("times");

  client.subscribe('dentist/getTimeslots', function () {
      // When a message arrives, print it to the console
      client.on('message', function (topic, message) {
    
        // console.log("Received this lovely " + message + "  on " + topic + " yaay")
        
        const dentistDetails = JSON.parse(message);
        let dentistid = dentistDetails.id;
        let day = dentistDetails.day;
    
        // console.log("dentist: ", dentistid);
    
        if(topic === 'dentist/getTimeslots') {

      Timeslots.find({ dentistid: dentistid, day: day },
      function (err, gentime) {
        if (err) {
          return next(err);
        }
        let responseString = JSON.stringify(gentime);
         // console.log('response:::::   ' + responseString)
  
           client.publish( "ui/dentistTimeSlotsFound", responseString, 1, (error) => {
              if (error) {
                console.error(error);
              } else {
                console.log("sent the user appointmets to UI ")
              }
            }); 
      } 
        )}
    })
    }) 

    function checkAppointmentAvailability(date, time, callback) {
      // Find the number of available dentists at the given time
      Booking.find({ availability: { $gt: 0 }, start: time, date: date }, (err, bookings) => {
        if (err) {
          return callback(err);
        }
        // Return the availability result
        callback(null, bookings.length > 0);
      });
    }
    
    client.subscribe('appointment/request', 'subscribed to appointment/request ')
    // Receive availability check request
    client.on('message', (topic, message) => {
      if (topic === 'appointment/request') {
        const { date, time } = JSON.parse(message);
        checkAppointmentAvailability(date, time, (err, availability) => {
          if (err) {
            console.error(err);
          } else {
            client.publish('appointment/response', JSON.stringify({ available: availability }));
          }
        });
      }
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

const Timeslots = require("../Models/TimeSlotsModel");
var moment = require('moment');
moment().format();
var fetch = require("node-fetch")
var mongoose = require('mongoose');
var mqtt = require("mqtt");
const path = require('path')
require('dotenv').config({ path: path.resolve(__dirname, './.env') })


let mthd = {
    method: "Get"
};

// Variables
var mongoURI = process.env.MONGODB_URI || 'mongodb+srv://Dentistimo:QsyJymgvpYZZeJPc@cluster0.hnkdpp5.mongodb.net/?retryWrites=true&w=majority'; 
var port = process.env.PORT || 3000;
// Connect to MongoDB
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true }, function(err) {
    if (err) {
        console.error(`Failed to connect to MongoDB with URI: ${mongoURI}`);
        console.error(err.stack);
        process.exit(1);
    }
    console.log(`Connected to MongoDB with URI: ${mongoURI}`);
}); 

const options = {
    host: '45fb8d87df7040eb8434cea2937cfb31.s1.eu.hivemq.cloud',
    port: 8883,
    protocol: 'mqtts',
    username: 'Team5@Broker',
    password: 'Team5@Broker'
  }
  
  const client = mqtt.connect(options)
  
    let topic = "dentist/getTimeslots";
  
    client.on("message", function (topic, message) {
      console.log(String.fromCharCode.apply(null, message)); 
    });
  
    client.on("message", (topic, payload) => {
      console.log('Received message here:', topic, payload.toString());
      console.log(payload.toString());
    });
    
    // setup the callbacks
client.on('connect', function () {
    console.log('Connected Successfully');
    console.log('Listening...');
  });
  
  client.on('error', function (error) {
    console.log(error);
  });
  
    
    client.on("connect", () => {
      console.log("Connected!!!22");
    });
    

     client.subscribe("times");

    client.subscribe('dentist/getTimeslots', function () {
        // When a message arrives, print it to the console
        client.on('message', function (topic, message) {
      
          // console.log("Received this lovely " + message + "  on " + topic + " yaay")
          
          const dentistDetails = JSON.parse(message);
          let dentistid = dentistDetails.id;
      
          // console.log("dentist: ", dentistid);
      
          if(topic === 'dentist/getTimeslots') {

        Timeslots.find(
        { dentistid: dentistid },
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
      
let dentistsUrl = "https://raw.githubusercontent.com/feldob/dit355_2020/master/dentists.json";
async function getDentists() {
    try {
        var response = await fetch(dentistsUrl, mthd);
        dentistsJson = await response.text();
        dentistsJson = JSON.parse( dentistsJson);
       // console.log( dentistsJson)
    } catch (e) {
        console.error(e)
    }
    return  dentistsJson;
    
}
function generateTimeslots(startingHour, minutes, endingHour, half) {
    var start = moment().utc().set({hour: startingHour,minutes: minutes});
    var end = moment().utc().set({hour: endingHour,minutes: minutes});
    var timeSlots = [];
    while (start <= end) {
    timeSlots.push(new moment(start).format('HH:mm'));
    start.add(half, 'minutes');
    }
    return timeSlots
}
var timeslots = []

async function createAppointment() {
    dentistsJson = await getDentists()

    for (i = 0; i <  dentistsJson.dentists.length; i++) {
        var dentistsNumber =  dentistsJson.dentists[i].dentists
        var openinghours =  dentistsJson.dentists[i].openinghours
        Object.keys(openinghours).forEach(async function(key) {
        var day = key;
        // get the opening hour only from openinghours
        var openinghour = openinghours[key].slice(0, openinghours[key].indexOf('-').toString());
        var openingHour = openinghour.slice(0, openinghour.indexOf(':').toString());
        // get the closing hour only from openinghours
        var closinghour = openinghours[key].slice(openinghours[key].lastIndexOf('-') + 1).toString();
        var closingHour = closinghour.slice(0, closinghour.indexOf(':').toString());
        // get generated timeslots within closing and opening hours
        var timeSlots = generateTimeslots(openingHour, 00, closingHour, 30);
         // take away lunch anf fika times
        var breaks = ['12:00','12:30','15:00', '10:00']; 
        for(let i=0; i < breaks.length; i++) {
            var slot = breaks[i];
            var index = timeSlots.indexOf(slot);
            if(index > -1) {
            timeSlots.splice(index, 1)
            }
        }
  
        const timeslot = new Timeslots({
            dentistid: dentistsJson.dentists[i].id,
            name: dentistsJson.dentists[i].name,
            openinghour: openingHour,
            closinghour: closingHour,
            timeSlots: timeSlots,
            dentistsNumber : dentistsNumber,
            day: day,  
            })

            const result = await findTimeslot({
                dentistid: timeslot.dentistid
              });
              if (result === null) {
                timeslot.save();
                console.log(timeslot.name +" timeslots is saved");
              } else {
                console.log(timeslot.name + " is Already saved.");
              }
            })
        } 
    } 
        const findTimeslot = async (filter) => {
            return Timeslots.findOne(filter).exec();
          };
  

var alltimeSlots = createAppointment();
module.exports= {
    alltimeSlots
}


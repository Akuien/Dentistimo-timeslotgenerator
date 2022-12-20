const Appointment = require("../Models/AppointmentModel");

var moment = require('moment');
moment().format();
var fetch = require("node-fetch")



let mthd = {
    method: "Get"
};

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
var appointments = []

async function createAppointment() {
    dentistsJson = await getDentists()

    for (i = 0; i <  dentistsJson.dentists.length; i++) {
        var openinghours =  dentistsJson.dentists[i].openinghours
        var dentistsNum =  dentistsJson.dentists[i].dentists
        Object.keys(openinghours).forEach(function(key) {
          
        var day = key;

        var openinghour = openinghours[key].slice(0, openinghours[key].indexOf('-').toString());
        var openingHour = openinghour.slice(0, openinghour.indexOf(':').toString());
        var closinghour = openinghours[key].slice(openinghours[key].lastIndexOf('-') + 1).toString();
        var closingHour = closinghour.slice(0, closinghour.indexOf(':').toString());
        var timeSlots = generateTimeslots(openingHour, 00, closingHour, 30);
        var breaks = ['12:00','12:30','15:00', '10:00']; // take away lunch anf fika times
        for(let i=0; i < breaks.length; i++) {
            var timeslot = breaks[i];
            var index = timeSlots.indexOf(timeslot);
            if(index > -1) {
            timeSlots.splice(index, 1)
            }
        }   var appointment = {
            id: dentistsJson.dentists[i].id,
            name : dentistsJson.dentists[i].name,
            owner : dentistsJson.dentists[i].owner,
            address : dentistsJson.dentists[i].address,
            city : dentistsJson.dentists[i].city,
            openinghour: openingHour,
            closinghour: closingHour,
            timeSlots: timeSlots,
            dentistsNum : dentistsNum,
            day: day,   
            date: ""
            }

            appointments.push(appointment)
            console.log(appointment)
        })
    } return appointments;
}

var alltimeSlots = createAppointment();



module.exports.createAppointment =  createAppointment;

module.exports= {
    alltimeSlots
}
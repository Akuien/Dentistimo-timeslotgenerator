# T-5-timeSlotGenerator

## Description:
This component is part of the distributed system Dentistimo, which is a web application that allows users to book dentist appointments with ease. The timeslot generator is responsible for generating time slots according to the opening and closing of each dental clinic, by fetching the dentists data. Each timeslot refers to one appointment that lasts for 30 minutes long, While no timeslots are visible during lunch or Fika times.
The compnent recieves the date from the user per request where its published from the user Interface, and the timeslots generator subscribes and publishes the timeslots available for that certain date.

## Component Responiblities:
- Generate timeslots
- Forward available timeslots to user interface
- Filter timeslots based dentist-id, date and day
- Check if chosen time-slot has an available appointment

## Architectural style

- **Publish and subscribe:**

Timeslots generator acts as subscriber when recieving the date published by the user interface component, and acts as a publisher when sending created the timeslots to the user interface component accordingly, where the user interface component would subscribes to it and display the timeslots available to the user. 

## Get started:

1. Clone the repository
2. Go to terminal and install all dependancies using: `npm install`
3. To run the component do: `cd src ` then  ` node main.js`

##Technologies:
- Node.js
- MongoDB
- HiveMQ
- node-fetch
- Moment.js
##

**More details about this system can be found in:** [Documentation](https://git.chalmers.se/courses/dit355/dit356-2022/t-5/t-5-documentation)

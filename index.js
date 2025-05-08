const express = require('express');
const mongoose = require('mongoose');

const userRoute = require('./routes/user');
const workoutRoute = require('./routes/workout');

const port = 4000;

const app = express();

mongoose.connect("mongodb+srv://admin:admin1234@course-booking.jt0at.mongodb.net/fitness-tracker-API?retryWrites=true&w=majority&appName=Course-Booking");

mongoose.connection.once('open', () => console.log('Now connected to MongoDB Atlas'));

app.use(express.json());

app.use('/users', userRoute);
app.use('/workouts', workoutRoute);

if(require.main === module) {
	app.listen(port, () => console.log(`API is now online on port ${port}`)); 
};

module.exports = {app, mongoose};
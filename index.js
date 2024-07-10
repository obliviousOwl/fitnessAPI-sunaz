const express = require('express');
const mongoose = require('mongoose');

const cors = require('cors')

const app = express();
const port = 4000;


const workoutRoutes = require("./routes/workout");
const userRoutes = require("./routes/user");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

mongoose.connect('mongodb+srv://admin:admin1234@jimdb.1oza6gb.mongodb.net/Fitness-APP-API?retryWrites=true&w=majority&appName=JimDB');

let db = mongoose.connection;

db.on('error' , console.error.bind(console, 'connection error'));
db.once('open', () => console.log(`We're now connected to MongoDb Atlas`));

app.use("/workouts", workoutRoutes);
app.use("/users", userRoutes);


if(require.main === module){
	app.listen(process.env.PORT || 4000, () => {
	    console.log(`API is now online on port ${ process.env.PORT || 4000 }`)
	});
}

module.exports = { app, mongoose }
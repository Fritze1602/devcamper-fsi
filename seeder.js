const fs = require('fs');
const mongoose = require('mongoose');
const colors = require('colors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const path = require('path');

// Load envVars
dotenv.config({ path: './config/config.env' });
connectDB();

// Load Model
const Bootcamp = require('./models/Bootcamp');

// ConnectDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true
});

// Read JSON Files
const dataBootcampsPath = path.join(__dirname, '_data', 'bootcamps.json');
const bootcamps = JSON.parse(fs.readFileSync(dataBootcampsPath, 'utf-8'));

// Import into DB
const importData = async () => {
  try {
    await Bootcamp.create(bootcamps);
    console.log('data imported ... '.green.inverse);
    process.exit();
  } catch (error) {
    console.log(error);
  }
};

//Delete Data
const deleteData = async () => {
  try {
    await Bootcamp.deleteMany();
    console.log('data destroyed ... '.red.inverse);
    process.exit();
  } catch (error) {
    console.log(error);
  }
};

if (process.argv[2] === '-i') {
  importData();
} else if (process.argv[2] === '-d') {
  deleteData();
}

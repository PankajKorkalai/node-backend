const mongoose =  require('mongoose');

//define the MongoDB connection URL
const mongoURL = 'mongodb://localhost:27017/hotel' // replace mydatabase with your database

//set up MongoDB connection
mongoose.connect(mongoURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

// Get the default connection
// Mongoose maintains a default connection object represinting the mongoDB connection.
const db = mongoose.connection;

// Defint event listners for database connection

db.on('connected', () => {
    console.log('Connected to MongoDB server');
})

db.on('error', (err) => {
    console.log('MongoDB Connection error:',err);
})

db.on('disconnected', () => {
    console.log('MongoDB disconnected');
})

// Export the databasse connection
module.exports = db;
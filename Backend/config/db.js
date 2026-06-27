const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    // .env se nikal kar direct apni string yahan paste karke check karein
    const testURI = "mongodb+srv://Admin:MQpgkBwHqNZqC6pQ@cluster0.2le6lbn.mongodb.net/?appName=Cluster0";
    
    const conn = await mongoose.connect(testURI);
    console.log(`MongoDB Connected Successfully: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Database Connection Error: ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;
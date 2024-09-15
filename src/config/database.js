let mongoose = require("mongoose");

const connectToDatabase = async () => {
  try {
    console.log("Connecting to database...");

    // Use environment variable for MongoDB URI (fallback to localhost)
    const dbUri =
      process.env.MONGODB_URI || "mongodb://localhost:27017/blockChain";

    // Mongoose connection options
    const options = {
      serverSelectionTimeoutMS: 5000, // Timeout after 5s if can't connect
    };

    // Attempt to connect
    await mongoose.connect(dbUri, options);

    // Event listeners for the connection
    mongoose.connection.on("connected", () => {
      console.log("Mongoose connected to MongoDB");
    });

    mongoose.connection.on("error", (err) => {
      console.error("Mongoose connection error:", err);
    });

    mongoose.connection.on("disconnected", () => {
      console.log("Mongoose disconnected from MongoDB");
    });

    return true; // Indicate successful connection
  } catch (error) {
    console.error("Failed to connect to MongoDB", error);
    return false; // Indicate connection failure
  }
};

module.exports = { connectToDatabase };

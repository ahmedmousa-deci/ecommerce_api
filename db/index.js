import mongoose from "mongoose";

/**
 * Connecting to the database, Requires the url to connect
 * @param {string} url
 */
async function connectDB(url) {
  try {
    await mongoose.connect(url);
    console.log("connected");
  } catch (e) {
    console.log("connection faild");
    console.error(e);
    process.exit(1);
  }
}

export default connectDB;

import mongoose from 'mongoose';

const mongoURL = process.env.MONGODB_URL || '';
if (!mongoURL) {
  throw new Error('Please add your MongoDB connection string to .env.local');
}

export const connectToDB = async () => {
  try {
    await mongoose.connect(mongoURL);
    console.log("Connected to db!");
  } catch (error) {
    console.error("Error connecting to db:", error);
    throw error;
  }
};

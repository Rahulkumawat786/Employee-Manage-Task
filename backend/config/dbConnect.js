import mongoose from "mongoose";

const dbConnection = async () => {
  const URL = process.env.MONGO_URL;
  try {
    const con = await mongoose.connect(URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log(`MongoDB Connected: ${con.connection.host}`);
  } catch (error) {
    console.log(`Error: ${error.message}`);
    process.exit();
  }
};

export default dbConnection;

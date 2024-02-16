import mongoose from "mongoose";

mongoose.set("strictQuery", true);

const connectDatabase = async () => {
  const url = `mongodb://127.0.0.1:27017/${process.env.DB_NAME}`;
  try {
    await mongoose.connect(url, {
      useNewUrlParser: true,
    });
    console.log("Database connected");
  } catch (err) {
    console.error("Could not connect", err);
  }
};

export default connectDatabase;

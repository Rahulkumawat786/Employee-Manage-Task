import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import dbConnection from "./config/dbConnect.js";
import taskroutes from "./routes/taskroutes.js";
const app = express(); //creating express server
dotenv.config();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json()); //to handle json type data
app.use(cors()); //for enabling cross origin resource sharing
app.use("/api/taskcontroll", taskroutes);
// connect to the mongodb database
dbConnection();
const PORT = process.env.PORT || 8000;
app.listen(PORT, console.log(`server is running on PORT: ${PORT}`));

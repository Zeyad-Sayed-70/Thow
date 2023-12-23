import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import { app } from "./app";

dotenv.config();

const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

// Call the routers file
import "./routers";

app.get("/", (req, res) => {
  res.json({ greeting: "Welcome my dear friend" });
});

// Connect to MongoDB
mongoose
  .connect(process.env.MONGODB_URI as string, {
    dbName: "main",
  })
  .then(() => console.log("MongoDB: All Good"))
  .catch(() => console.log("MongoDB: Bad Status"));

// Start the server
app.listen(PORT, () => console.log(`Server is running on port: ${PORT}`));

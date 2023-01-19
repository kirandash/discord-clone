const express = require("express");
const http = require("http");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const authRoutes = require("./routes/authRoutes");

const PORT = process.env.PORT || process.env.API_PORT;

// create express app
const app = express();

// Middlewares
app.use(express.json());
app.use(cors());
// register the rotues
app.use("/api/auth", authRoutes);

// create http server
const server = http.createServer(app);

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    server.listen(PORT, () => {
      console.log(`Server is listening on ${PORT}`);
    });
  })
  .catch((e) => {
    console.log("Database connection failed. Server not started!");
    console.error(e);
  });

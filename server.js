/* DT207G - Backend-baserad webbutveckling
 * Moment 4
 * Linn Eriksson, VT24
 */

//Constants and requirements
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const authRoutes = require("./routes/authRoutes");
const app = express();
const mongoose = require("mongoose");
const port = process.env.PORT || 3000;
const jwt = require("jsonwebtoken");

//Use JSON in API-calls.
app.use(express.json());

//Activate CORS middleware for all routes.
app.use(cors({
    origin: "*",
    methods: "GET, PUT, POST, DELETE"
}));

//To be able to send data with post.
app.use(express.urlencoded({extended:true}));

//Routes.
app.use("/api", authRoutes);

app.listen(port, () => {
    console.log("Server running on port: " + port);
});
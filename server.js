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

//Protected routes
app.get("/api/protected", authenticateToken, (req, res) => {
    res.json({message: "Protected route."});
});

function authenticateToken(req, res, next) {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    //If token exists.
    if(token == null) {
        res.status(401).json({message: "Not authorized."});
    }

    //Verify JWT.
    jwt.verify(token, process.env.JWT_SECRET_KEY, (err, username) => {
        if(err) {
            return res.status(403).json({message: "Incorrect token!"});
        }

        req.username = username;
        next();
    });
}

app.listen(port, () => {
    console.log("Server running on port: " + port);
});

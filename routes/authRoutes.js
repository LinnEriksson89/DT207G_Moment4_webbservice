/* DT207G - Backend-baserad webbutveckling
 * Moment 4
 * Linn Eriksson, VT24
 */

//Routes for authorizated users.
//constants and requirements.
const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");


//Connect
mongoose.connect(process.env.DBLINK)
    .then(() => {
        console.log("Connected to mongoDB.");
    }).catch((error) => {
        console.log("Error connecting do database: " + error);
    });

//User model
const User = require("../models/User");

router.post("/register", async (req, res) => {

    //Variables from the body.
    const username = req.body.username;
    const password = req.body.password;

    //Object for errors.
    let error = {
        message: "",
        details: "",
        https_response: {}
    };

    //If-else to validate input.
    if (!username || !password) {

        //Error messages and response code.
        error.message = "Information missing!";
        error.details = "To add a user a username and a password is required.";
        error.https_response.message = "Bad Request!";
        error.https_response.code = 400;

        //Send error-message and return.
        res.status(400).json(error);
        return;
    } else if (username.length < 4 || username.length > 25) {
        //Error messages and response code.
        error.message = "Incorrect information!";
        error.details = "Username needs to be between 4 and 25 characters long.";
        error.https_response.message = "Bad request";
        error.https_response.code = 400;

        //Send error message and return.
        res.status(400).json(error);
        return;
    } else if (password.length < 10 || password.length > 100) {
        //Error messages and response code.
        error.message = "Incorrect information!";
        error.details = "Password needs to be between 10 and 100 characters long.";
        error.https_response.message = "Bad request";
        error.https_response.code = 400;

        //Send error message and return.
        res.status(400).json(error);
        return;
    }

    //Try-catch for actual post.
    try {
        const user = new User ({username, password});
        const previousUser = await User.findOne({username});
        
        if (previousUser) {
            //Error messages and response code.
            error.message = "Username not available!";
            error.details = "Usernames are unique and there is already an account with this username.";
            error.https_response.message = "Bad request";
            error.https_response.code = 400;
    
            //Send error message and return.
            res.status(400).json(error);
            return;
        } else {
            let result = await user.save();

            if(result === null) {
                return res.status(500).json({message: "Something went wrong: " + error});
            } else {
                return res.status(201).json({message: "User has been created!"});
            }
        }
    } catch (error) {
        res.status(500).json({ error: "Server error!" });
    }
});

router.post("/login", async (req, res) => {
    try {
        const {username, password} = req.body;

        //Validate input
        if(!username || !password) {
            return res.status(400).json({error: "Invalid input, send username and password."});
        }

        //Check credentials.
        //Does user exist?
        const user = await User.findOne({username});

        if(!user) {
            res.status(401).json({error: "Invalid username and/or password."});
        }

        //Check password.
        const isPasswordMatch = await user.comparePassword(password);
        if(!isPasswordMatch) {
            return  res.status(401).json({error: "Invalid username and/or password." + user});
        }

        //If password is correct.
        if(isPasswordMatch) {
            return  res.status(200).json({message: "Login successful."});
        }

    } catch (error) {
        res.status(500).json({ error: "Server error!" });
    }
});

module.exports = router;
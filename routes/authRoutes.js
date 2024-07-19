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

//Create a schema.
const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: [true, "Username required."],
        min: [4, "Username has to be at least 4 characters."],
        max: [25, "Usernam can't be more than 25 characters."]
    },
    password: {
        type: String,
        required: [true, "Password required."],
        min: [10, "Password has to be at least 10 characters."],
        max: [100, "Password can be max 100 characters."]
    }
});

//Create a model.
const User = mongoose.model("User", userSchema);

router.post("/register", async (req, res) => {

    //Variables from the body.
    let username = req.body.username;
    let password = req.body.password;

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
        let user = {
            username: username,
            password: password
        }

        let result = await User.create(user);

        if(result === null) {
            return res.status(500).json({message: "Something went wrong: " + error});
        } else {
            return res.status(201).json({message: "User has been created!"});
        }

    } catch (error) {
        res.status(500).json({ error: "Server error!" });
    }
});

router.post("/login", async (req, res) => {
    console.log("Login called..");
});

module.exports = router;
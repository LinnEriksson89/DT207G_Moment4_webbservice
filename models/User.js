/* DT207G - Backend-baserad webbutveckling
 * Moment 4
 * Linn Eriksson, VT24
 */

//Constants and requirements.
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

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
    },
    created: {
        type: Date, 
        default: Date.now
    }
});

//Hash password
userSchema.pre("save", async function(next) {
    try {
        if(this.isNew || this.isModified("password")) {
            const hashedPassword = await bcrypt.hash(this.password, 10);
            this.password = hashedPassword;
        }
        next();
    } catch (error) {
        next(error);   
    }
});

//Register user.
userSchema.statics.register = async function (username, password) {
    try {
        const user = new this({username, password});
        const previousUser = await this.findOne({username});

        //Check if username exists.
        if(!previousUser) {
            await user.save();
            return user;
        } else {
            throw new Error("Username already in use.");
        }
    } catch (error) {
        throw error;
    }
};

//Compare hashed password.
userSchema.methods.comparePassword = async function(password) {
    try {
        return await bcrypt.compare(password, this.password);
    } catch (error) {
        throw error;        
    }
};

//Login user.
userSchema.statics.login = async function(username, password) {
    try {
        const user = await this.findOne({username});
        
        if(!user) {
            throw new Error("Incorrect username and/or password!");
        }

        const isPasswordMatch = await user.comparePassword(password);
        
        //If password is incorrect.
        if(!isPasswordMatch) {
            throw new Error("Incorrect username and/or password!");
        }

        //If password is correct.
        if(isPasswordMatch) {
            return user;
        }
    } catch (error) {
        throw error;
    }
}

//Create a model.
const User = mongoose.model("User", userSchema);
module.exports = User;
/* DT207G - Backend-baserad webbutveckling
 * Moment 4
 * Linn Eriksson, VT24
 */

//Constants and requirements.
const mongoose = require("mongoose");

//Create a schema.
const dataSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, "Name needed."],
        min: [5, "Names are at least 5 characters long"],
        max: [15, "Names can't be longer than 15 characters"]
    },
    letter: {
        type: String,
        required: [true, "Letter-code needed."],
        min: [1, "The code needs to be at least one character."],
        max: [2, "No codes over 2 characters exists."]
    },
    city: {
        type: String,
        required: [true, "City of residency needed."],
        min: [4, "No city with fewer characters than 4 exists."],
        max: [9, "No city with more than 9 characters exists."]
    },
    municipalities: {
        type: Number,
        required: [true, "Amount of municipalities needed."],
        min: [1, "No region without municipalities exists."],
        max: [49, "No region with more than 49 municipalities exists."]
    }
});

//Create a model.
const Data = mongoose.model("Data", dataSchema);
module.exports = Data;
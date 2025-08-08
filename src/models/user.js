const mongoose = require("mongoose");

const userschema = new mongoose.Schema({
    firstName: {
        type: String
    },
    lastName: {
        type: String
    },
    password: {
        type: String
    },
    emailId: {
        type: String
    },
    age: {
        type: Number
    },
    gender: {
        type: String
    }
})
module.exports = mongoose.model("users", userschema)
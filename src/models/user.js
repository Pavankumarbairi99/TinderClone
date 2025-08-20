const mongoose = require("mongoose");
const validator = require("validator")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")

const userschema = new mongoose.Schema({
    firstName: {
        type: String,
        minLength: 4,
        maxLength: 20,
        required: true,
        trim: true

    },
    lastName: {
        type: String
    },

    emailId: {
        type: String,
        required: true,
        lowercase: true,
        unique: true,
        trim: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error("invalid EmailID " + value)
            }
        }
    },
    password: {
        type: String,
        required: true,
        minLength: 6,
        trim: true,
        validate(value) {
            if (!validator.isStrongPassword(value)) {
                throw new Error("Your Password is Week add Strong Password")
            }
        }
    },
    age: {
        type: Number,
        min: 18
    },
    gender: {
        type: String,
        validate(value) {
            if (!["male", "female", "other", "Male", 'Female', "Other"].includes(value)) {
                throw new Error("Gender is Not Vaild give vaild Gener")
            }
        }
    },
    photoUrl: {
        type: String,
        validate(value) {
            if (!validator.isURL(value)) {
                throw new Error("Please Provide valide URL")
            }
        },
        default: "https://res.cloudinary.com/dvubvku3b/image/upload/v1754802904/TinderClone/60111_okyjft.jpg"
    },
    skills: {
        type: [String],
        maxLength: 10
    },
    about: {
        type: String,
        default: "Hey I'm using the DevTinder App."
    }
}, {
    timestamps: true
})

userschema.methods.getJwt = async function() {
    let user = this;
    const token = await jwt.sign({ _id: user._id }, "TinderClone#9980p", { expiresIn: "1d" })
    return token
}
userschema.methods.posswordValidate = async function(userinputPossword) {
    let user = this;
    const isPosswordValide = await bcrypt.compare(userinputPossword, user.password)
    return isPosswordValide;
}

module.exports = mongoose.model("users", userschema)
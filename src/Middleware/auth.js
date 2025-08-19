const express = require("express");
const app = express();
const cookieParser = require("cookie-parser")
const User = require("../models/user");
const jwt = require("jsonwebtoken")
app.use(express.json());
app.use(cookieParser())


let userAuth = async(req, res, next) => {
    try {
        let { token } = req.cookies
        if (!token) {
            throw new Error("Invailde Token")
        }
        let isTokenvalide = await jwt.verify(token, "TinderClone#9980p")
        const { _id } = isTokenvalide;
        const user = await User.findById(_id)
        if (!user) {
            throw new Error("User not found")
        }
        req.user = user;
        next()
    } catch (err) {
        res.status(400).send("Error:" + err.message)
    }

}
module.exports = {
    userAuth,
}
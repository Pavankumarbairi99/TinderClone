const express = require("express")
const authrouter = express()
const bcrypt = require("bcrypt")
const User = require("../models/user");
const { userAuth } = require("../Middleware/auth")


// add a user to Signup
authrouter.post("/signup", async(req, res) => {
    try {
        let { emailId, password } = req.body
        let checkemail = await User.findOne({ emailId: emailId })
        if (checkemail) {
            res.send("User already Register")
        } else {
            if (req.body.skills.length > 10) {
                throw new Error("Skills should be add only 10")
            } else if (req.body.skills.length === 0 || (req.body.skills.length < 10 && req.body.skills.length > 1)) {
                let passwordHash = await bcrypt.hash(password, 10)
                let userdata = req.body;
                userdata.password = passwordHash
                let users = new User(userdata)
                await users.save()
                res.send(req.body.firstName + " your account is Successfull Register  ")
            }
        }

    } catch (err) {
        res.status(400).send("Connection faild " + err.message)
    }

})

// login a user profile
authrouter.post("/login", async(req, res) => {
    try {
        let { emailId, password } = req.body;
        let user = await User.findOne({ emailId: emailId })
        if (!user) {
            throw new Error("Invalid Credentials")
        }
        let passwordCheck = await user.posswordValidate(password)
        if (passwordCheck) {
            const token = await user.getJwt()
            res.cookie("token", token, { httpOnly: true })
            res.send(user.firstName + " " + user.lastName + " " + "Login Sucessfull")
        } else {
            throw new Error("Invalid Credentials")
        }

    } catch (err) {
        res.status(400).send("something went worng " + err.message)
    }
})


module.exports = authrouter
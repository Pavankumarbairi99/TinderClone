const express = require("express");
require("./config/dataBase")
const { serverdb } = require("./config/dataBase");
const User = require("./models/user");
const app = express();
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const cookieParser = require("cookie-parser")
const { userAuth } = require("./Middleware/auth")
app.use(express.json());
app.use(cookieParser())

// add a user  Signup
app.post("/user", async(req, res) => {
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
app.post("/login", async(req, res) => {
    try {
        let { emailId, password } = req.body;
        let findprofile = await User.findOne({ emailId: emailId })
        if (!findprofile) {
            throw new Error("Invalid Credentials")
        }
        let passwordCheck = await bcrypt.compare(password, findprofile.password)
        if (passwordCheck) {
            const token = await jwt.sign({ _id: findprofile._id }, "TinderClone#9980p", { expiresIn: "1d" })
            res.cookie("token", token, { httpOnly: true })
            res.send(findprofile.firstName + " " + findprofile.lastName + " " + "Login Sucessfull")
        } else {
            throw new Error("Invalid Credentials")
        }

    } catch (err) {
        res.status(400).send("something went worng " + err.message)
    }
})

app.get("/profile", userAuth, async(req, res) => {
    try {
        let profile = req.user;

        res.send(profile)

    } catch (err) {
        res.status(400).send("something went worng " + err.message)
    }

})
app.post("/connectionrequest", userAuth, async(req, res) => {
        let userporfile = req.user;
        res.send(userporfile.firstName + " Sent connention Request")
    })
    // update user details
app.patch("/user", async(req, res) => {
    try {
        let data = req.params.userId;
        let allowUpdates = ["gender", "age", "photoUrl", "about", "skills"];
        let checkallows = Object.keys(req.body).every((k) => allowUpdates.includes(k))

        if (!checkallows) {
            throw new Error("Update Not Allowed")
        }
        if (Object.keys(req.body).includes("skills")) {
            if (req.body.skills.length > 10) {
                throw new Error("you can add upto 10 skills")
            }
        }
        let profile = await User.findByIdAndUpdate({ _id: data }, req.body, { runValidators: true })
        res.send("Data is Updated")

    } catch (err) {
        res.status(400).send("Update Failed: " + err.message)
    }
})


serverdb().then(() => {
    console.log("Conntect Sucessfully to MongoDB")
    app.listen(7000, () => {
        console.log("You Connected to LocalHost:7000 Server")
    })
}).catch((err) => {
    console.error("Connection Failed " + err)
})
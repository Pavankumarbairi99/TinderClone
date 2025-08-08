const express = require("express");
require("./config/dataBase")
const { serverdb } = require("./config/dataBase");
const User = require("./models/user")
const app = express();
let data = [{
        userName: "Pavan Kumar",
        password: 8099,
        emailId: "pavankumar@gmail.com"
    },
    {
        userName: "Allu Bhai",
        password: 1242,
        emailId: "alluarjun@gmail.com"
    },
    {
        userName: "Kamal",
        password: 3423,
        emailId: "kamal@gmail.com"
    },
    {
        userName: "chandu",
        password: 6754,
        emailId: "chandu12@gmail.com"
    },
]


app.get("/user", (req, res) => {
    res.send("Login successfully")
})
app.post("/signup", async(req, res) => {
    let users = new User({
        firstName: "Varun",
        lastName: "kumar star",
        emailId: "mani@gmail.com",
        password: "fd32efjj34",
        age: 23
    })
    try {
        await users.save()
        res.send("Register Successfull ")
    } catch (err) {
        res.status(400).send("Connection faild" + err.message)
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
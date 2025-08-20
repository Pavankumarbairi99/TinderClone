const express = require("express")
const request = express()
const { userAuth } = require("../Middleware/auth")

request.post("/connectionrequest", userAuth, async(req, res) => {
    let userporfile = req.user;
    res.send(userporfile.firstName + " Sent connention Request")
})

module.exports = request;
const express = require("express")
const profileRouter = express()
const { userAuth } = require("../Middleware/auth")


profileRouter.get("/profile", userAuth, async(req, res) => {
    try {
        let profile = req.user;

        res.send(profile)

    } catch (err) {
        res.status(400).send("something went worng " + err.message)
    }

})


module.exports = profileRouter
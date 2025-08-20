const express = require("express");
require("./config/dataBase")
const { serverdb } = require("./config/dataBase");
const User = require("./models/user");
const app = express();
const cookieParser = require("cookie-parser")
app.use(express.json());
app.use(cookieParser())

const authrouter = require("./routers/authRouter")
const profileRouter = require("./routers/profile")
const requestRouter = require("./routers/request")

app.use("/", authrouter)
app.use("/", profileRouter)
app.use("/", requestRouter)



serverdb().then(() => {
    console.log("Conntect Sucessfully to MongoDB")
    app.listen(7000, () => {
        console.log("You Connected to LocalHost:7000 Server")
    })
}).catch((err) => {
    console.error("Connection Failed " + err)
})
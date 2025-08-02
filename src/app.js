const express = require("express");

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
app.use("/userlogin", (req, res) => {
    res.send(data);
})
app.use("/hello", (req, res) => {
    res.send("This is the Hello Server")
});
app.use("/test", (req, res) => {
    res.send("This is the Test Server")
});
app.use((req, res) => {
    res.send("This is my first Express.js Server")
})

app.listen(7000)
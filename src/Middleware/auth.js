let adminAuth = (req, res, next) => {
    let userdata = "abs";
    console.log("Admin Checked")
    let auth = userdata === "abs";
    if (!auth) {
        res.status(401).send("UnAthuroized user Access Denote")

    } else {
        next()
    }
}
module.exports = {
    adminAuth,
}
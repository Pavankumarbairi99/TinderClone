const User = require("../models/user")
const bcrypt = require("bcrypt")
let loginValidation = async(req) => {
    let { emailId, password } = req.body;
    let findprofile = await User.findOne({ emailId: emailId })
    console.log(findprofile)
    if (!findprofile) {
        throw new Error("Invalid Credentials")
    }
    let passwordCheck = await bcrypt.compare(password, findprofile.password)
    console.log(passwordCheck)
    if (passwordCheck) {
        return true
    } else {
        throw new Error("Invalid Credentials")
    }
}
module.exports = {
    loginValidation
}
const exp = require("express")
const router = exp.Router()

const signin = require("./signin")
const signup = require("./signup")
// const logout = require("./logout")
const {signedIn, userDetails} = require("./profile")



router.post("/signup", signup)
router.post("/signin", signin)
router.get("/userDetails", userDetails)
// router.post("/profile", profile)

module.exports= router;
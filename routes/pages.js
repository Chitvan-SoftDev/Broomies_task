const exp = require("express")
const router = exp.Router()
const logout = require("../controllers/logout")
const {signedIn, userDetails} = require("../controllers/profile")

router.get("/", signedIn, (request, response) => {
    if (request.user) {
        response.sendFile("profile.html", { root: "./", status: "signedIn", user: request.user });
    } else {
        response.redirect("/signup"); 
    }
});
router.get("/api/user", signedIn, (request, response) => {
    if (request.user) {
        response.json({ user: request.user });
    } else {
        response.status(401).json({ error: "User not authenticated" });
    }
});

router.get("/signin",(request, response)=>{
    response.sendFile("signin.html", {root:"./"})
})
router.get("/signup",(request, response)=>{
    response.sendFile("signup.html", {root:"./"})
})
router.get("/logout", logout)

module.exports = router
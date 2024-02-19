const exp = require("express")
const cookie = require("cookie-parser")
const path = require("path")
const db = require("./routes/db-config")
const app = exp()
const PORT = process.env.PORT || 5000
app.use("/css", exp.static(path.join(__dirname, "assets", "css")))
app.use("/js", exp.static(path.join(__dirname, "assets", "js")))
app.use("/images", exp.static(path.join(__dirname, "assets", "images")))

app.use(cookie())
app.use(exp.json())
db.connect((error) => {
    if (error) {
        throw error
    }
    console.log("connection established")
})
app.set("views", "./views")
app.set("view engine", "ejs")
app.use("/", require("./routes/pages"))
app.use("/api", require("./controllers/auth"))
app.listen(PORT)


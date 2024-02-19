const sql = require("mysql2")
const dot_env = require("dotenv").config()
const db = sql.createConnection({
    database:process.env.DATABASE,
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password:process.env.DATABASE_PASSWORD
})
module.exports=db;
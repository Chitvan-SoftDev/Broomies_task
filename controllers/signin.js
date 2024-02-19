const jwt = require("jsonwebtoken")
const db = require("../routes/db-config")
const bcrypt = require("bcryptjs")

const signin = async (request, response) => {
    const {email,password } = request.body
    if (!email || !password) {
        response.json({ status: "error", error: "Please fill all the required fields." })
    }else{
        db.query('SELECT * FROM users WHERE email = ?',[email], async(error, result)=>{
            if(error){
                throw error
            }
            if(!result.length || !await bcrypt.compare(password,result[0].password)) {
                return response.json({status:"error", error:"Incorrect email or password."})
            }
            else{
                const jwtToken = jwt.sign({id: result[0].id},process.env.JWT_SECRET,{
                    expiresIn: process.env.JWT_EXP
                })
                const cookieOptions = {
                    expiresIn: new Date(Date.now()+process.env.COOKIE_EXP*24*60*60*1000),
                    httpOnly:true
                }
                response.cookie("userRegistered", jwtToken, cookieOptions)
                // response.redirect("/")
                return response.json({status: "success", success: "User logged in."})
                
            }
        })
    }
}
module.exports = signin
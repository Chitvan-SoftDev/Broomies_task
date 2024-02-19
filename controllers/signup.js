const db = require("../routes/db-config")
const bcrypt = require("bcryptjs")

const signup = async (request, response) => {
    const { first_name,
        last_name,
        email,
        username,
        password: Npassword } = request.body
    if (!first_name || !last_name || !email || !username || !Npassword) {
        response.json({ status: "error", error: "Please fill all the required fields." })
    }else{
        console.log(email)
        db.query('SELECT email FROM users WHERE email = ?',[email], async(error, result)=>{
            if(error){
                throw error
            }
            if(result[0]) {
                return response.json({status:"error", error:"Email already registered."})
            }
            else{
                const password = await bcrypt.hash(Npassword,8)
                console.log(password)

                db.query('INSERT INTO users SET ?', {first_name,last_name,username,email: email, password: password}, (error,result)=>{
                    if(error){
                        throw error
                    }else{
                        return response.json({status:"success", success:"User registered. Please sign in."})

                    }
                })
            }
        })
    }
}
module.exports = signup
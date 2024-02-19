const db = require("../routes/db-config")
const jwt = require("jsonwebtoken")

const signedIn = (request, response, next) => {
    if (!request.cookies.userRegistered) return next();
    try {
        const decoded = jwt.verify(request.cookies.userRegistered, process.env.JWT_SECRET)
        db.query('SELECT * FROM users WHERE id = ?', [decoded.id], (error, result) => {
            if (error) return next()
            request.user = result[0]
            return next()
        })
    } catch (error) {
        if (error) {
            return next()
        }
    }
}
const userDetails = (request, response)=>{

        const decoded = jwt.verify(request.cookies.userRegistered, process.env.JWT_SECRET)
        db.query('SELECT * FROM users WHERE id = ?', [decoded.id], (error, result) => {
            if (error) throw error
            return response.json({status:"success",user:result[0]})
            
        })

}
module.exports = {signedIn, userDetails}
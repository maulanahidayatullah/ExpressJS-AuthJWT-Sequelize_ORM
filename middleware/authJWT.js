const jwt = require("jsonwebtoken");


module.exports = {
    /**
     * 
     * @param {*} req 
     * @param {*} res 
     * @param {*} next 
     * @param {Array} role 
     * @returns 
     */

    auth: (req, res, next) => {
        const authorization = req.headers.authorization;
        if (authorization == null || authorization == undefined || authorization == "") {
            return res.status(400).json({ message: "No Tokens!", statuscode: 400 });
        }
        const token = String(authorization).split(" ");
        if (token.length != 2) {
            return res.status(401).json({ message: "Incorrect Token! Please Login Again", statuscode: 401 });
        }
        jwt.verify(token[1], process.env.ACCESS_TOKEN, async (error, result) => {
            if (error) {
                return res.status(401).json({ error: error, message: "Please Login Again!", statuscode: 401 });
            }
            else {
                next();
            }
        });
    },
};
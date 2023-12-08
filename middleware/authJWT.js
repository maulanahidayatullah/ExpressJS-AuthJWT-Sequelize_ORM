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
        // const authorization = req.headers.authorization;
        // if (authorization == null || authorization == undefined || authorization == "") {
        //     return res.status(400).json({ message: "No Tokens!", statuscode: 400 });
        // }
        // const token = String(authorization).split(" ");
        // if (token.length != 2) {
        //     return res.status(401).json({ message: "Incorrect Token! Please Login Again", statuscode: 401 });
        // }

        // else {

        //     
        //     jwt.verify(token[1], process.env.ACCESS_TOKEN_SECRET, async (error, result) => {
        //         if (error) {
        //             return res.status(401).json({ error: error, message: "Please Login Again!", statuscode: 401 });
        //         }
        //         const data = await userRepo.getkaryawanById(result.id);
        //         if (!role.includes(data.rows[0].roleName)) {
        //             return res.status(403).json({ message: "You Don't Have Access to This EndPoint!", statuscode: 403 });
        //         }
        //         if (req.headers.device != "website" && result.loginDeviceInfo != data.rows[0].loginDeviceInfo) {
        //             return res.status(403).json({ message: "You've Logged In Through Another Device!", statuscode: 403 });
        //         }
        //         req.headers.decodedToken = result;
        //         req.headers.dataKaryawan = data.rows[0];
        //         if (data.rows[0].statusId == 0) {
        //             return res.status(403).json({ statuscode: 403, message: "You Can't Login Because You Have Been Deactivated as an Employee!" });
        //         }
        //         if (data.rows[0].roleName != 'superadmin') {
        //             await cekSubscription(req, res, next);
        //         }
        //         else {
        //             next();
        //         }
        //     });
        // }
    },
};
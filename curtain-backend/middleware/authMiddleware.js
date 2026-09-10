const jwt = require("jsonwebtoken");
const User = require("../models/User");


// ========================================
// PROTECT ROUTE
// ========================================

const protect = async (req, res, next) => {

    try {

        // ========================================
        // GET AUTHORIZATION HEADER
        // ========================================

        const authHeader =
            req.headers.authorization;


        // ========================================
        // CHECK TOKEN
        // ========================================

        if (
            !authHeader ||
            !authHeader.startsWith("Bearer ")
        ) {

            return res.status(401).json({
                message: "Not authorized. No token provided."
            });

        }


        // ========================================
        // EXTRACT TOKEN
        // ========================================

        const token =
            authHeader.split(" ")[1];


        // ========================================
        // VERIFY TOKEN
        // ========================================

        const decoded =
            jwt.verify(
                token,
                process.env.JWT_SECRET
            );


        // ========================================
        // FIND USER
        // ========================================

        const user =
            await User.findById(decoded.id)
                .select("-password");


        // ========================================
        // CHECK USER
        // ========================================

        if (!user) {

            return res.status(401).json({
                message: "User no longer exists."
            });

        }


        // ========================================
        // ATTACH USER TO REQUEST
        // ========================================

        req.user = user;


        // ========================================
        // CONTINUE
        // ========================================

        next();


    } catch (error) {

        console.error(
            "Authentication error:",
            error.message
        );


        return res.status(401).json({
            message: "Not authorized. Invalid or expired token."
        });

    }

};


// ========================================
// EXPORT
// ========================================

module.exports = protect;
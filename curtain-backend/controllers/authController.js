const User = require("../models/User");

const bcrypt = require("bcryptjs");

const jwt = require("jsonwebtoken");


// ========================================
// REGISTER USER
// POST /api/auth/register
// ========================================

const registerUser = async (req, res) => {
    try {

        const {
            name,
            email,
            password
        } = req.body;


        // ----------------------------------------
        // CHECK REQUIRED FIELDS
        // ----------------------------------------

        if (!name || !email || !password) {

            return res.status(400).json({
                message: "Please provide name, email and password"
            });

        }


        // ----------------------------------------
        // CHECK PASSWORD LENGTH
        // ----------------------------------------

        if (password.length < 6) {

            return res.status(400).json({
                message: "Password must be at least 6 characters"
            });

        }


        // ----------------------------------------
        // CHECK IF USER ALREADY EXISTS
        // ----------------------------------------

        const existingUser = await User.findOne({
            email: email.toLowerCase()
        });


        if (existingUser) {

            return res.status(400).json({
                message: "User with this email already exists"
            });

        }


        // ----------------------------------------
        // HASH PASSWORD
        // ----------------------------------------

        const hashedPassword = await bcrypt.hash(
            password,
            10
        );


        // ----------------------------------------
        // CREATE USER
        // ----------------------------------------

        const user = new User({

            name: name.trim(),

            email: email.toLowerCase().trim(),

            password: hashedPassword

        });


        const savedUser = await user.save();


        // ----------------------------------------
        // CREATE JWT
        // ----------------------------------------

        const token = jwt.sign(

            {
                id: savedUser._id,
                email: savedUser.email
            },

            process.env.JWT_SECRET,

            {
                expiresIn: "7d"
            }

        );


        // ----------------------------------------
        // RESPONSE
        // ----------------------------------------

        res.status(201).json({

            message: "User registered successfully",

            token,

            user: {

                id: savedUser._id,

                name: savedUser.name,

                email: savedUser.email

            }

        });

    } catch (error) {

        console.error(
            "Registration error:",
            error
        );

        res.status(500).json({

            message: "Failed to register user",

            error: error.message

        });

    }
};



// ========================================
// LOGIN USER
// POST /api/auth/login
// ========================================

const loginUser = async (req, res) => {
    try {

        const {
            email,
            password
        } = req.body;


        // ----------------------------------------
        // CHECK REQUIRED FIELDS
        // ----------------------------------------

        if (!email || !password) {

            return res.status(400).json({
                message: "Please provide email and password"
            });

        }


        // ----------------------------------------
        // FIND USER
        // ----------------------------------------

        const user = await User.findOne({

            email: email.toLowerCase().trim()

        });


        if (!user) {

            return res.status(401).json({
                message: "Invalid email or password"
            });

        }


        // ----------------------------------------
        // COMPARE PASSWORD
        // ----------------------------------------

        const passwordMatch = await bcrypt.compare(

            password,

            user.password

        );


        if (!passwordMatch) {

            return res.status(401).json({
                message: "Invalid email or password"
            });

        }


        // ----------------------------------------
        // CREATE JWT
        // ----------------------------------------

        const token = jwt.sign(

            {
                id: user._id,
                email: user.email
            },

            process.env.JWT_SECRET,

            {
                expiresIn: "7d"
            }

        );


        // ----------------------------------------
        // RESPONSE
        // ----------------------------------------

        res.status(200).json({

            message: "Login successful",

            token,

            user: {

                id: user._id,

                name: user.name,

                email: user.email

            }

        });

    } catch (error) {

        console.error(
            "Login error:",
            error
        );

        res.status(500).json({

            message: "Failed to login",

            error: error.message

        });

    }
};


// ========================================
// GET CURRENT USER PROFILE
// GET /api/auth/profile
// ========================================

const getProfile = async (req, res) => {
    try {
        res.status(200).json({
            message: "Profile retrieved successfully",
            user: {
                id: req.user._id,
                name: req.user.name,
                email: req.user.email,
                createdAt: req.user.createdAt,
                updatedAt: req.user.updatedAt
            }
        });
    } catch (error) {
        console.error(
            "Profile error:",
            error
        );

        res.status(500).json({
            message: "Failed to retrieve profile",
            error: error.message
        });
    }
};

// ========================================
// EXPORT CONTROLLERS
// ========================================

module.exports = {

    registerUser,

    loginUser,

    getProfile

};
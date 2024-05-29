const jwt = require('jsonwebtoken');
const User = require('../model/user.model');
const asyncHandler = require("express-async-handler");

const generateToken = (id) => {
    return jwt.sign(
        { id: id },
        process.env.JWT_SECRET,
        { expiresIn: '1d' } 
    );
};



const authMiddleware = asyncHandler(async (req, res, next) => {
    let token;
    if (req.headers?.authorization?.startsWith("Bearer")) {
        token = req.headers.authorization.split(" ")[1];

        try {
            if (token) {
                const decoded = jwt.verify(token, process.env.JWT_SECRET);
                const user = await User.findById(decoded?.id);
                if (!user) {
                    return res.status(404).json({ message: "User does not exist" });
                }
                req.user = user._id;
                return next();
            }
        } catch (error) {
                return res.status(401).json({ message: "Not authorized.Please log in again." });
        }
    } else {
        return res.status(401).json({ message: "No token provided. Please log in." });
    }
});

module.exports = {
    generateToken,
    authMiddleware,
};

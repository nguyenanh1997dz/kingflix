
const User = require('../model/user.model')
const Movie = require('../model/movie.model')
const {HandleError} = require('../middleware/error')
const asyncHandler = require("express-async-handler")
const jwt = require("jsonwebtoken");
const {generateToken} = require('../middleware/auth');
const registerUser = asyncHandler(async(req,res) => {
    const {email} = req.body
     try {
        const user = await User.findOne({email})
        if (user) {
            throw new HandleError(400,`${user.email} is already registered`)
        }
        const newUser = await User.create(req.body);
        return  res.status(201).json(newUser);
     } catch (error) {
        throw new HandleError(400,error.message)
     }
})
const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) {
            throw new HandleError(400, "User not found");
        }
        if (user && (await user.isPasswordMatched(password))) {
            return res.status(200).json({
                fullName: user?.fullName,
                email: user?.email,
                image: user?.image,
                isAdmin: user?.isAdmin,
                token: generateToken(user?._id)
            });
        } else {
            throw new HandleError(400, "Email or password is invalid"); 
        }
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
});
const updateUser = asyncHandler(async (req, res) => {
    const { email, fullName, image } = req.body;
    const userId = req.user._id;
    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        if (email) user.email = email;
        if (fullName) user.fullName = fullName;
        if (image) user.image = image;
        
        await user.save();
        return res.json({
            fullName: user.fullName,
            email: user.email,
            image: user.image,
            isAdmin: user.isAdmin,
            token: generateToken(user._id)
        });
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
});

const deleteUser = asyncHandler(async (req, res) => {
    const userId = req.user._id;
    try {
         await User.findByIdAndDelete(userId);
        return res.json({ message: "Delete user successfully" });
    } catch (error) {
        throw new HandleError(500, error.message);
    }
});
const changePassword = asyncHandler(async (req, res) => {
    const userId = req.user._id;
    const { oldPassword, newPassword } = req.body;
    try {
        const user = await User.findById(userId);
        const isPasswordMatched = await user.isPasswordMatched(oldPassword);
        if (!isPasswordMatched) {
            throw new HandleError(400, "Old password is incorrect.");
        }
        user.password = newPassword;
        await user.save();
        return res.json({ message: "Password changed successfully." });
    } catch (error) {
        throw new HandleError(500, error.message);
    }
});
const getFavoriteMovies = asyncHandler(async (req, res) => {
    const userId = req.user._id;
    try {
        const movies = await User.findById(userId).select("likeMovies").populate("likeMovies");
        return res.json(movies.likeMovies);
    } catch (error) {
        throw new HandleError(500, "Something went wrong.Please try again.");
    }
});
const deleteFavoriteMovies = asyncHandler(async (req, res) => {
    const userId = req.user._id;
    try {
        const updatedUser = await User.findOneAndUpdate(
            { _id: userId },
            { $set: { likeMovies: [] } },
            { new: true }
          );
          return res.status(200).json({ message: "All liked movies removed successfully" });  
    } catch (error) {
        throw new HandleError(500, "Something went wrong.Please try again.");
    }
});
const deleteFavoriteMovieById = asyncHandler(async (req, res) => {
    const userId = req.user._id;
    const movieId = req.params.movieId;
    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        const movieIndex = user.likeMovies.indexOf(movieId);
        if (movieIndex === -1) {
            return res.status(404).json({ message: "Movie not found in user's liked list" });
        }
        user.likeMovies.splice(movieIndex, 1);
        await user.save();
        return res.status(200).json({ message: "Movie removed from liked list successfully" });
    } catch (error) {
        throw new HandleError(500, "Something went wrong. Please try again.");
    }
});
const addFavoriteMovies = asyncHandler(async (req, res) => {
    const userId = req.user._id;
    const { idMovie } = req.body;
    try {
        const user = await User.findById(userId);
        const movie = await Movie.findById(idMovie);
        if (!movie || !user) {
            return res.status(404).json({ message: "User or movie not found" });
        }
        if (user.likeMovies.includes(movie._id)) {
            user.likeMovies.remove(movie._id);
            await user.save(); 
            return res.status(200).json({ message: "Removed from favorites" });
        } else {
            user.likeMovies.push(movie._id);
            await user.save(); 
            return res.status(200).json({ message: "Added to favorites" });
        }
    } catch (error) {
        console.log(error.message);
        throw new HandleError(500, "Something went wrong. Please try again.");
    }
});
module.exports = {
    registerUser,
    loginUser,
    updateUser,
    changePassword,
    deleteUser,
    getFavoriteMovies,
    addFavoriteMovies,
    deleteFavoriteMovies,
    deleteFavoriteMovieById
}
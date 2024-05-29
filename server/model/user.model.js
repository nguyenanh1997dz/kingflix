const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const userSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: [true, "Please enter a full name"],
    },
    email: {
      type: String,
      required: [true, "Please enter a email address"],
      unique: true,
      validate: {
        validator: function(v) {
            return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v);
        },
        message: "Please enter a valid email"
    },
    },
    password: {
      type: String,
      required: [true, "Please enter a password"],
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    image: {
      type: String,
      default:"https://netflixo-ten.vercel.app/images/user.png"
    },
    likeMovies: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Movie",
      },
    ],
  },
  { timestamps: true }
);
userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
      next();
    }
    const salt = await bcrypt.genSaltSync(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  });
  userSchema.methods.isPasswordMatched = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
  };

module.exports = mongoose.model("User", userSchema);
const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema(
  {
    userName:{
        type: String
    },
    userImage:{
        type: String
    },
    rating:{
        type: Number
    },
    comment:{
        type: String
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Review", reviewSchema);
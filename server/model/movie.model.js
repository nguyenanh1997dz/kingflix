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

const movieSchema = new mongoose.Schema(
  {
    name: String,
    desc: String,
    titleImage: String,
    image: String,
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category",
    },
    language: String,
    year: String,
    hour: String,
    video: String,
    rate:Number,
    reviews: [reviewSchema],
    casts: [
        {
          name: String,
          img: String,
        }
      ],
    countReviews: {
        type: Number,
        default:0
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Movie", movieSchema);

const { HandleError } = require("../middleware/error");
const asyncHandler = require("express-async-handler");
const Movie = require("../model/movie.model");
const User = require("../model/user.model");

const addMovie = asyncHandler(async (req, res) => {
  const newMovie = await Movie.create(req.body);
  return res.status(201).json(newMovie);
});
const getMovies = asyncHandler(async (req, res) => {
  const { language, year, rate, time, search ,category } = req.query;
  try {
    const query = {};
    if (language) query.language = language;
    if (year) query.year = year;
    if (rate) query.rate = rate;
    if (time) query.hour = time;
    if (search) query.name = { $regex: search, $options: "i" };
    if (category) query.category = category;
    const moviesCount = await Movie.countDocuments(query);
    if (moviesCount === 0) {
      return res.status(404).json({ message: "No data" });
    }
    const limit = 8;
    const page = Number(req.query.page) || 1;
    const skip = (page - 1) * limit;
    const movies = await Movie.find(query).skip(skip).limit(limit).populate('category');
    const totalPage = Math.ceil(moviesCount / limit);
    if (page > totalPage) {
      throw new HandleError(404, "No data");
    }

    // Trả về kết quả dưới dạng JSON
    return res.status(200).json({
      movies: movies,
      moviesCount: moviesCount,
      totalPage: totalPage,
      currentPage: page, 
    });
  } catch (error) {
    // Bắt và xử lý lỗi
    throw new HandleError(403, error.message);
  }
});
const getMovieById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const movie = await Movie.findById(id);
    if (!movie) {
      throw new HandleError(404, "Movie not found");
    }
    res.status(200).json(movie);
  } catch (error) {
    throw new HandleError(403, error.message);
  }
});
const deleteMovieById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    await Movie.findByIdAndDelete(id);
    res.json({
      message: "Delete movie succesfully",
    });
  } catch (error) {
    throw new HandleError(403, error.message);
  }
});
const getTopRateMovie = asyncHandler(async (req, res) => {
  const { limit } = req.params;
  try {
    const movies = await Movie.find({})
      .sort({ rate: -1 })
      .limit(limit ?? 10);

    return res.status(200).json(movies);
  } catch (error) {
    throw new HandleError(403, error.message);
  }
});
const getRandomMovie = asyncHandler(async (req, res) => {
  try {
    const movies = await Movie.aggregate([{ $sample: { size: 8 } }]);
    return res.status(200).json(movies);
  } catch (error) {
    throw new HandleError(403, error.message);
  }
});
const createMovieReview = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  try {
    const movie = await Movie.findById(req.params.id);
    const user = await User.findById(userId);
    console.log(req.body.rating);
    if (movie) {
      const review = {
        userName: user.fullName,
        userImage: user?.image || "",
        rating: Number(req.body.rating),
        comment: req.body.message,
        userId: userId,
      };
      movie.reviews.push(review);
      movie.countReviews = movie.reviews.length;
      movie.rate =
        movie.reviews.reduce((acc, item) => item.rating + acc, 0) /
        movie.reviews.length;
      await movie.save();
      return res.status(200).json(movie);
    } else {
      throw new HandleError(400, "Movie not found");
    }
  } catch (error) {
    throw new HandleError(403, error.message);
  }
});
const updateMovie = asyncHandler(async (req, res) => {
  const {
    name,
    decs,
    titleImage,
    image,
    category,
    language,
    year,
    time,
    video,
    casts,
  } = req.body;

  try {
    const movie = await Movie.findById(req.params.id);
    if (!movie) {
      throw new HandleError(404, "Movie not found");
    }
    movie.name = name ?? movie.name;
    movie.category = category ?? movie.category;
    movie.year = year ?? movie.year;
    movie.time = time ?? movie.time;
    movie.video = video ?? movie.video;
    movie.casts = casts ?? movie.casts;
    movie.language = language ?? movie.language;
    movie.decs = decs ?? movie.decs;
    movie.titleImage = titleImage ?? movie.titleImage;
    movie.image = image ?? movie.image;
    await movie.save();
    return res.status(200).json(movie);
  } catch (error) {
    throw new HandleError(403, error.message);
  }
});

module.exports = {
  addMovie,
  getMovies,
  getMovieById,
  deleteMovieById,
  getTopRateMovie,
  getRandomMovie,
  createMovieReview,
  updateMovie,
};

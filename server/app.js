const express = require('express');
const dotenv = require('dotenv').config();
const cors = require('cors');
const morgan = require('morgan')
const { pageNotFound,errorMiddleware } = require('./middleware/error');
const connectToMongoDB = require('./config/database.config');
const passport = require('passport');
const passportStrategy  = require('./passport')
const session = require('express-session')

const authRouter = require('./router/auth.router')
const userRouter= require('./router/user.router')
const movieRouter= require('./router/movie.router')
const categoryRouter= require('./router/category.router');
const uploadRouter= require('./router/upload.router');
const app = express();

const PORT = process.env.PORT || 8000;
connectToMongoDB(app,PORT);

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));

app.use(session({
  secret: 'your-session-secret',
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 24 * 60 * 60 * 1000 } 
}));

app.use(passport.initialize())
app.use(passport.session());
app.use(morgan('dev'))
const corsOptions = {
  origin: "http://localhost:5173",
    credentials: true 
  };


app.use(cors(corsOptions));
app.use('/api/user',userRouter)
app.use('/auth',authRouter)
app.use('/api/movie',movieRouter)
app.use('/api/category',categoryRouter)
app.use('/api/upload',uploadRouter)
app.use("*",pageNotFound)
app.use(errorMiddleware)

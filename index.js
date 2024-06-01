require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const userRoutes = require('./routes/usersRoutes');
const moviesRoutes = require('./routes/moviesRoutes')
const reviewsRoutes = require('./routes/reviewsRouter');
const { auth } = require('./utils/auth');
const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3000;
const MONGO_URL = process.env.MONGO_URL;

app.use('/reviews', auth, reviewsRoutes);
app.use('/movies', auth, moviesRoutes);
// Auth is applied for some userRoutes, see userRoutes.
app.use('/', userRoutes);

app.listen(process.env.PORT, () => {
  console.log(`server runs on ${process.env.PORT}`);
});

mongoose.connect(process.env.MONGO_URL);

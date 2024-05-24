require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const userRoutes = require('./routes/usersRoutes');

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 8000;
const MONGO_URL = process.env.MONGO_URL;

app.use('/users', userRoutes);

app.listen(process.env.PORT, () => {
  console.log(`server runs on ${process.env.PORT}`);
});

mongoose.connect(process.env.MONGO_URL);



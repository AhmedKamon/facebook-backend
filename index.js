const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const helmet = require('helmet');
const morgan = require('morgan');

const userRoute = require('./routes/users');
const authRoute = require('./routes/auth');
const postRoute = require('./routes/post');

dotenv.config();

mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true }, () => {
  console.log('connected to mongoDB');
});

//middleware
app.use(express.json());
app.use(helmet());
app.use(morgan('common'));

app.use('/api/users', userRoute);
app.use('/api/auth', authRoute);
app.use('/api/posts', postRoute);

const PORT = 5050;
app.listen(PORT || precess.env.PORT, () => {
  console.log(`backend is running on PORT ${PORT || precess.env.PORT} `);
});

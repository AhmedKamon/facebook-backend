const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const helmet = require('helmet');
const morgan = require('morgan');

const userRoute = require('./routes/users');
const authRoute = require('./routes/auth');
const postRoute = require('./routes/post');
const conversationRoute = require('./routes/conversations');
const messageRoute = require('./routes/messages');
const multer = require('multer');
const path = require('path');
const imageUpload = require('./middleware/imageUploades');

dotenv.config();

mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true }, () => {
  console.log('connected to mongoDB');
});

app.use('/images', express.static(path.join(__dirname, 'public/images')));
//middleware
app.use(express.json());
app.use(helmet());
app.use(morgan('common'));

app.post('/api/upload', imageUpload, (req, res) => {
  try {
    return res.status(200).json('file upload successfully');
  } catch (error) {
    console.log(error);
  }
});

app.use('/api/users', userRoute);
app.use('/api/auth', authRoute);
app.use('/api/posts', postRoute);
app.use('/api/conversations', conversationRoute);
app.use('/api/messages', messageRoute);

const PORT = 5050;
app.listen(PORT || precess.env.PORT, () => {
  console.log(`backend is running on PORT ${PORT || precess.env.PORT} `);
});

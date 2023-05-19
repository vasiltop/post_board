const express = require('express');
const app = express();
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const port = 8000;
const authRoute = require('./routes/auth');
const postRoute = require('./routes/posts');
dotenv.config();

async function db() {
  await mongoose.connect(process.env.DB_CONNECT);
  console.log('connected to db');
}
db();


app.use(express.json());



app.use('/api/user', authRoute);
app.use('/api/posts', postRoute);

app.listen(port, () => {
  console.log(`Listening on port ${port}`)
});
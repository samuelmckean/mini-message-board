const dotenv = require('dotenv');
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const Message = require('./Message');
const path = require('path');

dotenv.config();

const app = express();
const PORT = 3000;
const URL = process.env.DB_URL;

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'frontend', 'build')));

mongoose.connect(URL, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', async () => {
  try {
    const messages = await Message.find();
  } catch {
    throw Error('Unable to get messages from database.');
  }
});

// message list that holds the current list of messages
const getMessages = async () => {
  try {
    return await Message.find(); 
  } catch {
    throw Error('Unable to get messages from database.');
  }
}

// homepage
app.get('/get-messages', async (req, res) => {
  try {
    const messages = await getMessages();
    res.json(messages);
  } catch {
    res.sendStatus(400);
  }
});

// create a new message entry
app.post('/new', async (req, res) => {
  try {
    // parse request data and add to database
    const message = new Message({
      text: req.body.text,
      user: req.body.user,
      added: req.body.added,
    });
    await message.save();
    res.sendStatus(201);
  } catch {
    console.log('Error: could not add to database');
    res.sendStatus(400);
  }
});

// send single-page react app on any route
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'frontend', 'build', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});

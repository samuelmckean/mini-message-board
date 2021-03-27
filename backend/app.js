const dotenv = require('dotenv');
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const Message = require('./Message');

dotenv.config();

const app = express();
const PORT = 3000;
const URL = process.env.DB_URL;

app.use(cors());
app.use(express.json());

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
app.get('/', async (req, res) => {
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

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});

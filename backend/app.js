const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

// message list to be removed and persisted with a database
const messages = [
  {
    text: "Hi there!",
    user: "Amando",
    added: new Date()
  },
  {
    text: "Hello World!",
    user: "Charles",
    added: new Date()
  }
];

// homepage
app.get('/', (req, res) => {
  res.json(messages);
});

// create a new message entry
app.post('/new', (req, res) => {
  try {
    // parse request data and push onto messages array
    const message = {
      text: req.body.messageText,
      user: req.body.messageUser,
      added: new Date(),
    };

    messages.push(message);
    res.sendStatus(201);
  } catch {
    console.log('error');
    res.sendStatus(400);
  }
});

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});

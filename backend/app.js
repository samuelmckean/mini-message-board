const express = require('express');

const app = express();
const PORT = 3000;

app.use(express.urlencoded({ extended: true }));

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
    console.log(req.body);
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

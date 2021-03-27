const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
  user: {
    type: String,
  },
  text: {
    type: String,
  },
  added: {
    type: String,
  },
});

module.exports = mongoose.model('Message', messageSchema);
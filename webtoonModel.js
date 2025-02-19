const mongoose = require('mongoose');

const webtoonSchema = new mongoose.Schema({
  title: { 
    type: String, 
    required: true, 
    unique: true 
  },
  description: { 
    type: String, 
    required: true 
  },
  characters: [{ 
    name: String, 
    role: String 
  }],
  createdAt: { 
    type: Date, 
    default: Date.now 
  }
});

module.exports = mongoose.model('Webtoon', webtoonSchema);
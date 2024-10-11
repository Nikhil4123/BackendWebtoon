const express = require('express');
const router = express.Router();
const Webtoon = require('./webtoonModel');
const authMiddleware = require('./authMiddleware');

// GET all webtoons
router.get('/', async (req, res) => {
  try {
    const webtoons = await Webtoon.find({}, 'title description characters');
    res.json(webtoons);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET a specific webtoon by ID
router.get('/:id', async (req, res) => {
  try {
    const webtoon = await Webtoon.findById(req.params.id);
    if (!webtoon) {
      return res.status(404).json({ message: 'Webtoon not found' });
    }
    res.json(webtoon);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// POST a new webtoon (protected route)
router.post('/', authMiddleware, async (req, res) => {
  const webtoon = new Webtoon({
    title: req.body.title,
    description: req.body.description,
    characters: req.body.characters
  });

  try {
    const newWebtoon = await webtoon.save();
    res.status(201).json(newWebtoon);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// DELETE a webtoon (protected route)
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    const webtoon = await Webtoon.findByIdAndDelete(req.params.id);
    if (!webtoon) {
      return res.status(404).json({ message: 'Webtoon not found' });
    }
    res.json({ message: 'Webtoon deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
import express from 'express'
import { addFood, listFood, removeFood } from '../controllers/foodController.js'


// Search Route
app.get('/search', async (req, res) => {
  const query = req.query.query; // The search query from the frontend
  if (!query) {
    return res.status(400).json({ message: 'Query parameter is required' });
  }

  try {
    // Search in the food collection for a match
    const results = await Food.find({ name: { $regex: query, $options: 'i' } }); // Case-insensitive search
    res.json(results);
  } catch (error) {
    console.error('Error while searching:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});
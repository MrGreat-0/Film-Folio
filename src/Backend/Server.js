import express from 'express';
import axios from 'axios';
import dotenv from 'dotenv';
import cors from 'cors';

// Load environment variables from .env file
dotenv.config();

const app = express();
const port = 3000;

// Enable CORS for all routes
app.use(cors()); // You can customize this if needed, but this allows all origins by default

// Universal API proxy route
app.get('/api/tmdb/*', async (req, res) => {
  const path = req.params[0];  // Capture the path after '/api/tmdb/'

  try {
    // Ensure the API key is available from the environment
    const apiKey = process.env.VITE_API_KEY;  // Use VITE_API_KEY from the .env file

    if (!apiKey) {
      return res.status(500).json({ error: 'API Key is missing in .env file' });
    }

    // Build the full TMDB API URL (properly encode the path)
    const tmdbUrl = `https://api.themoviedb.org/3/${encodeURIComponent(path)}`;

    // Forward the request to the TMDB API
    const response = await axios.get(tmdbUrl, {
      headers: {
        Authorization: `Bearer ${apiKey}`,
      },
      params: req.query,  // Pass any query params from the frontend request
    });

    // Send the TMDB API response back to the frontend
    res.json(response.data);
  } catch (error) {
    console.error('TMDB API Request Error:', error.response ? error.response.data : error.message);
    res.status(500).json({ error: 'Something went wrong with the TMDB API request' });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

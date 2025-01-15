import express from 'express';
import axios from 'axios';
import dotenv from 'dotenv';
import cors from 'cors';
import rateLimit from 'express-rate-limit';
import axiosRetry from 'axios-retry';

// Load environment variables from .env file
dotenv.config();

const app = express();
const port = 3000;

// Ensure API key is available
if (!process.env.VITE_API_KEY) {
  console.error('Error: API Key is missing in the environment variables');
  process.exit(1);
}

// Enable CORS for all routes
app.use(cors());

// Apply rate limiting globally
const limiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 10, // Limit each IP to 10 requests per windowMs
  message: { error: "Too many requests, please try again later." },
});
app.use(limiter);

// Create axios instance with timeout
const axiosInstance = axios.create({
  timeout: 5000, // 5 seconds timeout
});

// Apply retry logic with exponential backoff
axiosRetry(axiosInstance, {
  retries: 3,
  retryDelay: (retryCount) => retryCount * 1000, // Exponential backoff: 1s, 2s, 3s
  retryCondition: (error) => {
    console.log(`Retrying request... Attempt ${error.config['axios-retry'].retryCount + 1}`);
    return !error.response || error.response.status >= 500; // Retry on network errors or 5xx errors
  },
});

// Universal API proxy route
app.get('/api/tmdb/*', async (req, res) => {
  const path = req.params[0];

  try {
    const apiKey = process.env.VITE_API_KEY;
    const tmdbUrl = `https://api.themoviedb.org/3/${path}`;

    const response = await axiosInstance.get(tmdbUrl, {
      headers: {
        Authorization: `Bearer ${apiKey}`,
      },
      params: req.query,
    });

    res.json(response.data);
  } catch (error) {
    if (error.code === 'ENOTFOUND' || error.code === 'ECONNABORTED') {
      console.error('Network error:', error.message);
      return res.status(503).json({ error: 'Network error, please try again later.' });
    }

    if (error.response) {
      return res.status(error.response.status).json({ error: error.response.data });
    }

    console.error('Unexpected error:', error.message);
    res.status(500).json({ error: 'An unexpected error occurred.' });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

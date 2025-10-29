// Import the libraries we need
import express from 'express';   // Express for routing
import axios from 'axios';       // Axios for making HTTP requests

// Create a new router instance
const router = express.Router();

// --------------------
// Home route
// --------------------
// When the user visits "/", render the index.ejs template
// with no forecast data yet (just a blank form).
router.get('/', (req, res) => {
  res.render('index', { forecast, error: null, city });
});

// --------------------
// Weather route
// --------------------
// This route handles GET requests to "/weather".
// It expects a query parameter like ?city=Johannesburg
router.get('/weather', async (req, res) => {
  const city = req.query.city; // Grab the city name from the form input

  try {
    // 1️ First call: Geocoding API
    // Convert the city name into latitude and longitude
    const geoRes = await axios.get(
      `https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${process.env.API_KEY}`
    );

    // Extract lat/lon from the first result
    const { lat, lon } = geoRes.data[0];

    // 2️ Second call: Forecast API
    // Use the lat/lon to get the weather forecast
    const weatherRes = await axios.get(
      `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${process.env.API_KEY}&units=metric`
    );

    // Grab the first forecast block (next 3-hour interval)
    const forecast = weatherRes.data.list[0];

    // Render the index.ejs template with forecast data
    res.render('index', { forecast, error: null,city });

  } catch (error) {
    // If anything goes wrong (invalid city, API error, etc.)
    console.error(error.message);

    // Render the page with an error message
    res.render('index', { forecast: null, error: 'Could not fetch weather data. Please try again.', city });
  }
});

// Export the router so index.js can use it
export default router;
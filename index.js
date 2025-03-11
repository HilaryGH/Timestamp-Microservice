const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const PROJECT_URL = "https://timestamp-microservice-rzkn.onrender.com/";
// Serve a simple HTML response
app.get('/', (req, res) => {
    res.send(`
      <h1 style="color:#3d3d3d; font-size: 24px; padding:6px; text-align: center;">
        Timestamp Microservice
      </h1>
      <hr>
      <h2 style="color:#3d3d3d; font-size: 20px; text-align: center;">
        Example Usage:
      </h2>
      <p style="text-align: center; font-size:14px;">
        <a href="${PROJECT_URL}/api/date/2025-03-10" target="_blank" style="color:lightblue;">
          ${PROJECT_URL} /api/date/2025-03-10
        </a>
      </p>
      <p style="text-align: center; font-size:14px;">
        <a href="${PROJECT_URL}/api/date" target="_blank" style="color:lightblue;">
          ${PROJECT_URL}/api/date
        </a>
      </p>
      <h2 style="color:#3d3d3d; font-size: 20px; text-align: center;">
        Example Output:
      </h2>
      <p style="font-size:14px;text-align:center;">
        {"unix":1741609132895,"utc":"Mon, 10 Mar 2025 12:18:52 GMT"}
      </p>
    `);
});

// API endpoint for timestamp conversion using '/api/date/:date_string?' (date_string is optional)
app.get('/api/date/:date_string?', (req, res) => {
  const { date_string } = req.params; // Get the date_string parameter from the URL
  let date;

  // If no date_string is provided, use the current date
  if (!date_string) {
    date = new Date();
  } else {
    // If date_string is a valid Unix timestamp, convert it to Date object
    if (!isNaN(date_string)) {
      date = new Date(parseInt(date_string));
    } else {
      // Otherwise, try to parse it as a standard date string
      date = new Date(date_string);
    }
  }

  // If the date is invalid, return an error message
  if (isNaN(date.getTime())) {
    res.json({ error: "Invalid Date" });
  } else {
    // Return JSON object with unix and utc keys
    res.json({
      unix: date.getTime(),
      utc: date.toUTCString()
    });
  }
});

// Start the Express server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});


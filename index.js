const express = require("express");
const path = require("path");
const dotenv = require("dotenv");
const axios = require("axios");

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.static(path.join(__dirname, "./frontend")));
app.use(express.json());

// API endpoint for frontend to call
app.post("/api/ask", async (req, res) => {
  const { userInput } = req.body;
  try {
    const apiKey = process.env.API_KEY;
    const response = await axios.post(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`,
      {
        contents: [
          {
            parts: [
              {
                text: `
                  Respond to the user query: ${userInput}
                  Provide a detailed response with relevant information.
                  Do NOT use markdown format. Only respond with plain text and NO formatting.
                `,
              },
            ],
          },
        ],
      }
    );
    console.log(JSON.stringify(response.data, null, 2));
    res.json({ text: response.data.candidates[0].parts[0].text });
  } catch (error) {
    res.status(500).json({ error: "Error fetching response" });
  }
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
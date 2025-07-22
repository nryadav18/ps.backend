const express = require("express")
const Controllers = require("../controllers/getLocalSongData")
const Route = express.Router();

Route.get('/', (req, res) => {
    res.send(`
      <html>
        <head>
          <title>Local Songs Data Backend</title>
          <style>
            body {
              background: #f5f7fa;
              font-family: 'Segoe UI', sans-serif;
              display: flex;
              align-items: center;
              justify-content: center;
              height: 100vh;
              margin: 0;
            }
            .container {
              text-align: center;
              background: white;
              padding: 40px;
              border-radius: 16px;
              box-shadow: 0 0 20px rgba(0,0,0,0.1);
            }
            h1 {
              color: #3b82f6;
              font-size: 32px;
            }
            p {
              color: #6b7280;
              font-size: 18px;
              margin-top: 10px;
            }
            .emoji {
              font-size: 48px;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="emoji">✩♬ ₊ ̊.🎧⋆☾⋆⁺₊✧</div>
            <h1>Local Songs Data Backend Server</h1>
            <p>✅ Server is Running smoothly</p>
          </div>
        </body>
      </html>
    `);
});

Route.get("/get-data", Controllers.getData)

module.exports = Route;
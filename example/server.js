const express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000; // Choose an available port

app.use(bodyParser.json());

// Renders the html form
app.get('/', async (req, res) => {
  const form = fs.readFileSync(`${__dirname}/form.html`);
  res.send(form.toString('utf8'));
});

app.post('/submit-to-notion', async (req, res) => {
    try {
        const { name, email } = req.body;
        const notionDatabaseId = 'YOUR_NOTION_DB';
        const integrationToken = 'YOUR_NOTION_SECRET';

        const url = `https://api.notion.com/v1/pages`;

        const data = {
            parent: { database_id: notionDatabaseId },
            properties: {
                Name: { title: [{ text: { content: name } }] },
                Email: { email: email }
                // Add more properties based on your Notion database schema
            }
        };

       const result = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${integrationToken}`,
                'Notion-Version': '2021-08-16'
            },
            body: JSON.stringify(data)
        });

        if(result.status !== 200) {
          const error = await result.json();
          console.error('Got error saving data', error);
          return res.status(500).json({ error: error.message });
        }

        res.status(200).json({ message: 'Data saved to Notion!' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

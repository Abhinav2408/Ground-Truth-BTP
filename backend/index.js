const express = require('express');
const fs = require('fs');
const app = express();
const cors = require('cors');
const port = 3000;

app.use(express.json());
app.use(cors());

app.post('/login', (req, res) => {
    const { username, password } = req.body;
    if (username === 'Abhinav' && password === 'asdf') {
        res.status(200).json({ message: 'Login successful' });
    } else {
        res.status(401).json({ message: 'Login failed' });
    }
});

app.post('/post_label', async (req, res) => {
    var date = new Date();
    const newData = {
      timestamp: date,
      label: req.body.label,
      user: "Abhinav"
    };
  
    const jsonString = JSON.stringify(newData, null, 2)+"\n";
  
    const filePath = 'groundTruth.json';
  
    fs.appendFile(filePath, jsonString, 'utf8', (err) => {
      if (err) {
        console.error('Error writing to file:', err);
        res.send('Error writing to file');
      } else {
        console.log('Data has been saved!!');
        res.send('Data has been saved!!');
      }
    });
  
  });

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
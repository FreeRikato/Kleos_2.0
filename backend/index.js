const express = require('express');
const { spawn } = require('child_process');
const cors = require('cors');
const app = express();
const port = 3000;

app.use(cors()); // This will allow all origins by default

app.get('/run-python', (req, res) => {
    // Spawn a child process to run the Python script
    const pythonProcess = spawn('.venv/bin/python3', ['script.py']);

    // Collect data from the Python script
    let data = '';
    pythonProcess.stdout.on('data', (chunk) => {
        data += chunk.toString();
    });
    
    pythonProcess.stderr.on('data', (chunk) => {
        console.error(`Error: ${chunk}`);
    });
    
    pythonProcess.on('close', (code) => {
        if (code !== 0) {
            res.status(500).send('Error executing Python script');
            return;
        }
        
        // Parse the data and send it as JSON response
        try {
            const result = JSON.parse(data);
            res.json(result);
        } catch (e) {
            res.status(500).send('Error parsing Python script output');
        }
    });
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});

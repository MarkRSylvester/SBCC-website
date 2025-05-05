import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// CORS configuration
const corsOptions = {
    origin: '*',
    methods: ['GET', 'POST', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
};

// Enable CORS with configuration
app.use(cors(corsOptions));

// Serve static files from current directory
app.use(express.static(__dirname));

// Explicitly serve files from SBCC-Images directory
app.use('/SBCC-Images', express.static(path.join(__dirname, 'SBCC-Images')));

// Serve CSS files
app.use('/css', express.static(path.join(__dirname, 'css')));

// Handle all routes
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
    console.log('CORS enabled for all origins');
}); 
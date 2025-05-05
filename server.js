import http from 'http';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const server = http.createServer((req, res) => {
  // Get the file path
  let filePath = '.' + req.url;
  if (filePath === './') {
    filePath = './index.html';
  }

  // Get the file extension
  const extname = path.extname(filePath);
  
  // Set content type based on file extension
  let contentType = 'text/html';
  switch (extname) {
    case '.js':
      contentType = 'text/javascript';
      break;
    case '.css':
      contentType = 'text/css';
      break;
    case '.png':
      contentType = 'image/png';
      break;
    case '.jpg':
    case '.jpeg':
      contentType = 'image/jpeg';
      break;
    case '.svg':
      contentType = 'image/svg+xml';
      break;
  }

  // Read the file
  fs.readFile(filePath, (err, content) => {
    if (err) {
      if (err.code === 'ENOENT') {
        // Try to serve from parent directory for images
        if (req.url.includes('SBCC-Images')) {
          const parentPath = '..' + req.url;
          fs.readFile(parentPath, (err2, content2) => {
            if (err2) {
              res.writeHead(404);
              res.end('File not found');
              console.log('404 error for: ' + parentPath);
            } else {
              res.writeHead(200, { 'Content-Type': contentType });
              res.end(content2, 'utf-8');
            }
          });
        } else {
          // Page not found
          res.writeHead(404);
          res.end('404 Not Found');
          console.log('404 error for: ' + filePath);
        }
      } else {
        // Server error
        res.writeHead(500);
        res.end(`Server Error: ${err.code}`);
        console.log('500 error: ' + err.code);
      }
    } else {
      // Success
      res.writeHead(200, { 'Content-Type': contentType });
      res.end(content, 'utf-8');
    }
  });
});

const PORT = 3000;
server.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}/`));
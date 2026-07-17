import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
import { extname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('.', import.meta.url));
const port = Number(process.env.PORT || 3000);
const types = { '.html': 'text/html; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.css': 'text/css; charset=utf-8' };
createServer(async (req, res) => {
  try {
    const path = req.url === '/' ? 'index.html' : req.url.replace(/^\//, '');
    if (path.includes('..')) throw new Error('Invalid path');
    const file = join(root, path);
    res.writeHead(200, { 'Content-Type': types[extname(file)] || 'application/octet-stream' });
    res.end(await readFile(file));
  } catch { res.writeHead(404).end('Not found'); }
}).on('error', (error) => {
  if (error.code === 'EADDRINUSE') console.error(`Port ${port} is already in use. Start the web dashboard with PORT=<another-port> node server.js.`);
  else throw error;
}).listen(port, () => console.log(`DouaneNav web dashboard at http://localhost:${port}`));

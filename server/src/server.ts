import express from 'express';
import fs from 'fs';
import path from 'path';
import cors from 'cors';
import os from 'os';

const mime = require('mime-types');
const homedir = os.homedir();

const app = express();
const port = 3003;

const FILES_ROOT = process.env.VOYAGE_ROOT ?? homedir;

app.use(express.json()); // to support JSON-encoded bodies
app.use(express.urlencoded({ extended: true })); // to support URL-encoded bodies

app.use(cors());
app.use(express.static('../dist/voyage/browser/'));

app.get('/api/version', (req, res) => {
  const versionFile = path.join(__dirname, '..', '..', 'version.txt');
  try {
    const file = fs.readFileSync(versionFile);
    res.send(file.toString('utf8'));
  } catch (e) {
    res.send('0.0.0');
  }
});

app.get('/api/ls/:folder', (req, res) => {
  const { folder } = req.params;
  const folderPath = path.join(FILES_ROOT, decodeURIComponent(folder));

  try {
    const files = fs
      .readdirSync(folderPath)
      .map((p) => {
        try {
          const filePaath = path.join(folderPath, p);
          const stat = fs.statSync(filePaath);
          return {
            isDirectory: stat.isDirectory(),
            isFile: stat.isFile(),
            name: p,
            size: stat.size,
            modifiedDate: stat.mtime,
          };
        } catch (e) {
          return undefined;
        }
      })
      .filter((o) => o != undefined);
    console.log(`GET /api/ls ${folderPath} ${files.length} files`);
    res.send(files);
  } catch (err) {
    console.error(`GET /api/ls ${folderPath} ${err}`);
    res.status(500).send({ error: `${err}`, cause: err });
  }
});

app.get('/api/open/:file', async (req, res) => {
  const { file } = req.params;
  const filePath = path.join(FILES_ROOT, decodeURIComponent(file));

  try {
    const stat = fs.statSync(filePath);
    if (!stat.isFile) {
      res.status(400).send({ error: `Not a file: ${filePath}` });
      return;
    }
    const mimeType = mime.lookup(filePath);
    res.set('Content-Type', mimeType);
    const content = fs.readFileSync(filePath); // TODO check large files
    console.error(`GET /api/open/${file} ${content.length} bytes`);
    res.send(content);
  } catch (e) {
    console.error(`GET /api/open/${file} ${e}`);
    res.status(500).send({ error: 'Internal server error', cause: e });
  }
});

app.post('/api/rename', async (req, res) => {
  try {
    const from = path.join(FILES_ROOT, req.body.from);
    const to = path.join(FILES_ROOT, req.body.to);

    fs.renameSync(from, to);
    res.status(200).send();
  } catch (e) {
    console.error('POST /api/rename');
    res.status(500).send({ error: 'Failed to rename file', cause: e });
  }
});

app.get(/(.*)/, (req, res) => {
  res.sendFile(path.resolve(__dirname, '../../dist/voyage/browser/index.html'));
});

app.listen(port, () => {
  console.log(`Voyage server listening on port ${port} - root = ${FILES_ROOT}`);
});

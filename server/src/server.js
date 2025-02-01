const express = require("express");
const fs = require("fs");
const path = require("path");
const cors = require("cors");
const mime = require("mime-types");
const homedir = require("os").homedir();

const app = express();
const port = 3003;

const FILES_ROOT = process.env.VOYAGE_ROOT ?? homedir;

app.use(cors());

app.use(express.static("../dist/voyage/browser/"));

app.get("/api/version", (req, res) => {
  const versionFile = path.join(__dirname, "..", "..", "version.txt");
  try {
    const file = fs.readFileSync(versionFile);
    res.send(file.toString("utf8"));
  } catch (e) {
    res.send("0.0.0");
  }
});

app.get("/api/ls", (req, res) => {
  const { folder } = req.query;
  const folderPath = path.join(FILES_ROOT, decodeURIComponent(folder));
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
          modifiedDate: stat.modifiedDate,
        };
      } catch (e) {
        return undefined;
      }
    })
    .filter((o) => o != undefined);
  console.log(`GET /api/ls ${folderPath} ${files.length} files`);
  res.send(files);
});

app.get("/api/open", async (req, res) => {
  const { file } = req.query;
  const filePath = path.join(FILES_ROOT, decodeURIComponent(file));

  try {
    const stat = fs.statSync(filePath);
    if (!stat.isFile) {
      res.status(400).send({ error: `Not a file: ${filePath}` });
      return;
    }
    const mimeType = mime.lookup(filePath);
    res.set("Content-Type", mimeType);
    const content = fs.readFileSync(filePath); // TODO check large files
    res.send(content);
  } catch (e) {
    console.error(e);
    res.status(500).send({ error: "Internal server error", cause: e });
  }
});

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../../dist/voyage/browser/index.html"));
});

app.listen(port, () => {
  console.log(`Voyage server listening on port ${port} - root = ${FILES_ROOT}`);
});

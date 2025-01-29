const express = require("express");
const fs = require("fs");
const path = require("path");
const cors = require("cors");

const app = express();
const port = 3003;

app.use(cors());

app.get("/ls/:paramPath", (req, res) => {
  const { paramPath } = req.params;
  const files = fs
    .readdirSync(paramPath)
    .map((p) => {
      try {
        const filePath = path.join(paramPath, p);
        const stat = fs.statSync(filePath);
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
    .filter((o) => o != null);
  res.send(files);
});

app.listen(port, () => {
  console.log(`Voyage server listening on port ${port}`);
});

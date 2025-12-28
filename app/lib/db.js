import fs from "fs";
import path from "path";

const dbPath = path.join(process.cwd(), "app/lib/data/database.json");

function readFile() {
  if (!fs.existsSync(dbPath)) {
    fs.writeFileSync(dbPath, JSON.stringify({ payments: [] }, null, 2));
  }

  const data = fs.readFileSync(dbPath, "utf-8");
  return JSON.parse(data);
}

function writeFile(data) {
  fs.writeFileSync(dbPath, JSON.stringify(data, null, 2));
}

export function readDB() {
  return readFile();
}

export function writeDB(data) {
  writeFile(data);
}

import fs from "fs";
import path from "path";

const dbPath = path.join(process.cwd(), "data.json");

export function readDB() {
  if (!fs.existsSync(dbPath)) {
    fs.writeFileSync(dbPath, JSON.stringify({ payments: [] }));
  }
  return JSON.parse(fs.readFileSync(dbPath));
}

export function writeDB(data) {
  fs.writeFileSync(dbPath, JSON.stringify(data, null, 2));
}

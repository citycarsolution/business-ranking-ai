import fs from "fs";
import path from "path";

// Absolute path (important for Next.js)
const DB_PATH = path.join(process.cwd(), "data.json");

// Ensure DB exists
function ensureDB() {
  if (!fs.existsSync(DB_PATH)) {
    fs.writeFileSync(
      DB_PATH,
      JSON.stringify({ payments: [] }, null, 2)
    );
  }
}

export function readDB() {
  ensureDB();
  return JSON.parse(fs.readFileSync(DB_PATH, "utf-8"));
}

export function writeDB(data) {
  ensureDB();
  fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2));
}

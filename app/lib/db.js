// app/lib/db.js
let db = {
  payments: [],
};

export function readDB() {
  return db;
}

export function writeDB(data) {
  db = data;
}

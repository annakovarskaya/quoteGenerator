const express = require("express");
const bodyParser = require("body-parser");

const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database("db/quotes.db");

const app = express();
app.use(bodyParser.json());

app.set("port", process.env.PORT || 3001);

app.get("/api/quotes", (req, res, next) => {
  let sql = "SELECT * FROM quotes ORDER BY RANDOM()";
  db.get(sql, [], (err, row) => {
    if (err) {
      return console.error(err.message);
    }
    if(row) {
      res.json([
        {
          "title": row.author,
          "content": row.text,
        }
      ]);
    } else {
      res.json({});
    }
  });
});

app.post("/api/add_quote", (req, res, next) => {
  db.run("INSERT INTO quotes(author, text) VALUES(?, ?)", [req.body.title, req.body.content]);
  res.json({"message": "Quote was added successfully"});
});

app.listen(app.get("port"), () => {
  console.log(`Find the server at: http://localhost:${app.get("port")}/`); // eslint-disable-line no-console
});

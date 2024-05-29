const express = require("express");
const { MongoClient } = require("mongodb");
const cors = require("cors"); // Importer le middleware cors

const app = express();
const port = 3000;
const uri = "mongodb://localhost:27017";
const client = new MongoClient(uri);

app.use(cors()); // Utiliser le middleware cors

app.get("/authors", async (req, res) => {
  try {
    await client.connect();
    const database = client.db("DBLP");
    const collection = database.collection("publis");
    const authors = await collection.distinct("author");
    res.json(authors);
  } catch (error) {
    res.status(500).json({ error: error.message });
  } finally {
    await client.close();
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});

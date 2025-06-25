const express = require("express");
const path = require("path");
const fs = require("fs");
const { error } = require("console");
const app = express();
// const MongoClient = require("mongodb").MongoClient;

const { MongoClient } = require("mongodb");
const uri = "mongodb://admin:root@localhost:27017/";
const client = new MongoClient(uri);

async function saveUser(user) {
  try {
    await client.connect();
    console.log("Connected to MongoDB");

    const db = client.db("user_account");
    const collection = db.collection("users")

    const result = await collection.updateOne(
          { userid: 1 },
          { $set: user },
          { upsert: true },
          (err, result) => {
            client.close();
            if (err) return res.status(500).send({ error: "Update failed" });
            res.send(userObj);
          }
        );;

    console.log("Data inserted:", result.insertedId);
  } catch (err) {
    console.error("Error:", err);
  } finally {
    await client.close();
  }
}

async function loadData() {
  try {
    await client.connect();
    console.log("Connected to MongoDB");

    const db = client.db("user_account");
    const collection = db.collection("users");

    const users = await collection.find().toArray();
    console.log("Données chargées :");
    console.table(users);
  } catch (err) {
    console.error("Erreur :", err);
  } finally {
    await client.close();
  }
}
loadData();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.get("/get-profile", (req, res) => {
  MongoClient.connect("mongodb://admin:root@localhost:27017", (err, client) => {
    if (err) return res.status(500).send({ error: "DB connection failed" });

    const db = client.db("user_account"); // <-- renommé
    db.collection("users").findOne({ userid: 1 }, (err, result) => {
      client.close();
      if (err) return res.status(500).send({ error: "Query failed" });
      res.send(result || {});
    });
  });
});

app.post("/update-profile", (req, res) => {
  const userObj = { ...req.body, userid: 1 };
  saveUser(userObj);

  // console.log("connect to the DB....");
  // MongoClient.connect("mongodb://localhost:27017", (err, client) => {
  //   if (err) return res.status(500).send({ error: "DB connection failed" });
  //   console.log("after connect DB....");
  //   const db = client.db("user_account");
  //   db.collection("users").updateOne(
  //     { userid: 1 },
  //     { $set: userObj },
  //     { upsert: true },
  //     (err, result) => {
  //       client.close();
  //       if (err) return res.status(500).send({ error: "Update failed" });
  //       res.send(userObj);
  //     }
  //   );
  // }).catch((error) => console.log(error));
});

app.get("/profile-picture", (req, res) => {
  const imagePath = path.join(__dirname, "profile-1.jpg");
  if (fs.existsSync(imagePath)) {
    res.sendFile(imagePath);
  } else {
    res.status(404).send("Image not found");
  }
});

app.listen(3000, () => {
  console.log("App listening on port 3000");
});



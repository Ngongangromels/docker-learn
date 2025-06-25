const { MongoClient } = require("mongodb");

console.log("connect DB...")
MongoClient.connect("mongodb://admin:root@localhost:27017", (err, client) => {
  if (err) {
    console.error("❌ Connexion échouée :", err.message);
  } else {
    console.log("✅ Connexion réussie à MongoDB !");
    client.close();
  }
});

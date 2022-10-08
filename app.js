const { application } = require("express");
const express = require("express");
const { connecter } = require("./bd/connect");
const routesUser = require("./route/user");
const app = express();

app.use(express.urlencoded({ extended : true }));    
app.use(express.json());

app.use("/api/v1", routesUser);
connecter("mongodb://localhost:27017/", (erreur) => {
  if (erreur) {
    console.log("Error to connect to MongoDB");
    process.exit(1);
  } else {
    console.log("Connected to MongoDB");
    app.listen(80);
    console.log("connected success port 80");
  }
});

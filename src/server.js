const cors = require("cors");
const express = require("express");
const consumableRouter = require("./routes/consumable.router");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/consumables", consumableRouter);

app.get("/", (req, res) => {
  res.json({
    message: "AdminFlow APIv1",
  });
});

module.exports = app;

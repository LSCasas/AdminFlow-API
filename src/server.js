const cors = require("cors");
const express = require("express");
const consumableRouter = require("./routes/consumable.router");
const userRouter = require("./routes/user.router");
const areaRouter = require("./routes/area.router");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/consumables", consumableRouter);
app.use("/user", userRouter);
app.use("/area", areaRouter);

app.get("/", (req, res) => {
  res.json({
    message: "AdminFlow APIv1",
  });
});

module.exports = app;

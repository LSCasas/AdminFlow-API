const cors = require("cors");
const express = require("express");
const consumableRouter = require("./routes/consumable.router");
const userRouter = require("./routes/user.router");
const areaRouter = require("./routes/area.router");
const authRouter = require("./routes/auth.router");
const recordRouter = require("./routes/record.router");
const adminRouter = require("./routes/admin.router");

const app = express();

app.use(
  cors({
    origin: ["http://localhost:3000", "https://admin-flow-ten.vercel.app/"],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
app.use(express.json());

app.use("/consumables", consumableRouter);
app.use("/auth", authRouter);
app.use("/user", userRouter);
app.use("/area", areaRouter);
app.use("/record", recordRouter);
app.use("/admin", adminRouter);

app.get("/", (req, res) => {
  res.json({
    message: "AdminFlow APIv1",
  });
});

module.exports = app;

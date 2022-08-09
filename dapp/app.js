const express = require("express");
const morgan = require("morgan");
const connect = require("./schemas");

const walletRouter = require("./routes/wallet");

const app = express();
app.set("port", process.env.PORT || 3000);

connect();

app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/wallet", walletRouter);

app.use((req, res, next) => {
  const error = new Error(`${req.method} ${req.url} 라우터가 없습니다.`);
  error.status = 404;
  next(error);
});

app.use((err, req, res) => {
  console.log(err);
  res.status(500).send(err.message);
});

app.listen(app.get("port"), () => {
  console.log(app.get("port"), "에서 대기 중");
});

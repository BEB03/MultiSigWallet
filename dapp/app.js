const express = require("express");

const app = express();
app.set("port", process.env.PORT || 3000);

app.get("/", (req, res) => {
  res.send("hello express");
});

app.listen(app.get("port"), () => {
  console.log(app.get("port"), "에서 대기 중");
});

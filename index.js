const express = require("express");
const webpush = require("web-push");
const bodyParser = require("body-parser");
const path = require("path");

const app = express();

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "client")));

// 实际秘钥要进行加密存储，同时进行接口下发到客户端
const publicVapidKey =
  "BPMK0-oNTwhuqgyyp0AsAC-qeAzNJiVVuB9UryU_Uzy7hdjRmiW1ymZdwr5w68X-GAt4W5tglW6ZNIRbzOffSMk";
const privateVapidKey = "FJtkPXMTirzlTQKx9Mnp68oU_ycXnRb-5UMCnIUmBC4"; // 跟客户端publicVapidKey保持一致。

webpush.setVapidDetails(
  "mailto:test@test.com",
  publicVapidKey,
  privateVapidKey
);

app.post("/subscribe", (req, res) => {
  const subscription = req.body;
  res.status(201).json({});
  const payload = JSON.stringify({ title: "测试消息", body: "hello啊 老铁" });

  console.log(subscription, "====>subscription");
  console.log(payload, "====>payload");

  setTimeout(() => {
    webpush
      .sendNotification(subscription, payload)
      .then((res) => {
        console.log("发送成功", res);
      })
      .catch((err) => {
        console.log('发送失败', err)
      });
  }, 5000);
});

const PORT = 5001;

app.listen(PORT, () => {
  console.log(`server started at :${PORT}`);
});

const express = require("express");
const connection_database = require("./connectDB.js");
const cors = require("cors");

const db = require("./models");
const app = express();
app.use(express.json()); // cho phép sử dụng json
app.use(cors()); //xác thực người dùng

// Routers
const postRouter = require("./routes/PostsRouter.js");
app.use("/posts", postRouter);

//connect database
db.sequelize.sync().then(() => {
  //định nghĩa xong model và chúng ta chỉ cần làm là tạo bảng tương ứng với model đó bằng cách chạy phương thức sync. sync sequelize sẽ tự tạo.
  connection_database();
  app.listen(5000, async () => {
    console.log("Port is listing");
  });
});

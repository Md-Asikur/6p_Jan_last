const bodyParser = require("body-parser")
const cookieParser = require("cookie-parser")
const cors=require("cors")
const express = require("express")
const fileupload=require("express-fileupload")
const errorMiddleware = require("../server/middleware/error");



const path = require("path");

// Config

  require("dotenv").config({ path: "../server/config/config.env" });

const app = express()
app.use(express.json({ limit: "10mb" }));
//app.use(express.urlencoded({ limit: "10mb" }));
app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: "10mb" }));
app.use(fileupload());
app.use(cookieParser());
app.use(cors({ origin: process.env.FRONTEND_URL }));
console.log(process.env.FRONTEND_URL);
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", process.env.FRONTEND_URL);
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, PATCH, DELETE");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With, Content-Type, Authorization"
  );
  next();
});

//routes
const product = require("../server/routes/productRouter")
const user = require("../server/routes/userRouter")
const order = require("../server/routes/orderRoute")
const payment = require("../server/routes/paymentRoute");
//errors
app.get("/", (req, res) => {
  res.json({message:"Hello Alhamdulillah I am Live Now"})
})
app.use(errorMiddleware)
app.use("/api/v1", product)
app.use("/api/v1", user);
app.use("/api/v1", order);
app.use("/api/v1", payment);

app.use(errorMiddleware)
module.exports=app
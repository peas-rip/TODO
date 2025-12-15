const express=require("express");
const app=express();
const authRoutes=require("./routes/auth.routes");
const todoRoutes=require("./routes/todo.routes");
const cors=require("cors");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
app.use(express.json());

app.use(cors());


app.use(helmet());

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // max 100 requests per 15 mins per IP
  message: "Too many requests, please try again later."
});

app.use(limiter);

app.use("/api/auth",authRoutes);
app.use("/api/todos",todoRoutes);

app.get("/",(req,res)=>
{
    res.json({status:"ok"});
});

module.exports=app;
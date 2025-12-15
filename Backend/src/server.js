require("dotenv").config();
const app=require("./app");
const connectDb=require("./config/db");


const PORT=process.env.PORT||4000;

connectDb().then(
    ()=>
    {
        app.listen(PORT,()=>
        {
            console.log("Server running on port",PORT);

        });
    }
).catch((err)=>
{
    console.log("DB connection failed:",err);
});


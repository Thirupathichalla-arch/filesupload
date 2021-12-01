const  connect=require("./configs/db");

const app=require("./index");

app.listen(435,async()=>{
    await connect();
    console.log("R u listening Thiru 435");
})
module.exports=app;
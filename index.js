const express=require("express");
const app=express();
app.use(express.json());

const productController= require("./controller/product.controller");
const galleryController= require("./controller/gallery.controller");


app.use("/products",productController);
app.use("/gallery",galleryController);


module.exports=app;
const {Schema,model}=require("mongoose");

const productSchema=new Schema({
    product_name:{required:true,type:String},
    price:{required:true,type:Number},
    image_urls:[{type:String,required:true}]
},{
    versionKey:false,
    timestamps:true,
});

module.exports=new model("products",productSchema)
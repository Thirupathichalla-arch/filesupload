const {Schema,model}=require("mongoose");

const productSchema=new Schema({
    first_name:{required:true,type:String},
    last_name:{required:true,type:String},
    Profile_pic:[{type:String,required:true}]
},{
    versionKey:false,
    timestamps:true,
});

module.exports=new model("products",productSchema)
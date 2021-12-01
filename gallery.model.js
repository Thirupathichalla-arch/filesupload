const {Schema,model,mongoose}=require("mongoose");

const gallerySchema=new Schema({
    image_urls:[{type:String,required:true}],
    user_id:{
        type:Schema.Types.ObjectId,
        ref:"products",
        required:true,

    }
},{
    versionKey:false,
    timestamps:true,
});

module.exports=new model("gallery",gallerySchema)
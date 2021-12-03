const express = require("express");

//const path = require("path")
const fs = require("fs");

const Gallery = require("../models/gallery.model");

const upload =require("../middleware/uploads")

const router = express.Router();


router.post("/multiple", upload.any("pictures"), async (req, res) => {

    const filepaths=req.files.map((file)=>file.path)
    try {
        const gallery = await Gallery.create({
            image_urls: filepaths,
            user_id:req.body.user_id,
        });
        return res.status(201).json({ gallery })
    }
    catch (e) {
        res.status(500).json({ "message": e.message, "status": "Failed" });
    }
});
router.get("/", upload.any("pictures"), async (req, res) => {

    const filepaths=req.files.map((file)=>file.path)
    try {
        const gallery = await Gallery.find().populate("user_id");
        return res.status(201).json({ gallery })
    }
    catch (e) {
        res.status(500).json({ "message": e.message, "status": "Failed" });
    }
});

router.get("/",async(req,res)=>{
    try{
        const gallery = await Gallery.find().populate({path : "user_id"}).lean().exec();

        res.json({gallery});

    }catch(e){
        res.status(500).json({"message" : e.message});
    }
});


router.delete("/:id",async(req,res)=>{
    try{
        const pictures = await Gallery.findById(req.params.id).populate("user_id").lean().exec();
        const files = [...pictures.pictures,pictures.user_id.Profile_pic];
        // console.log(files);
        files.forEach((file)=>{
            fs.unlink(file,(err)=>{
                if(err)
                {
                    console.log(err);
                }
            })
        })
        const user = await User.findByIdAndDelete(pictures.user_id._id).lean().exec();
        const gallery = await Gallery.findByIdAndDelete(req.params.id).lean().exec();
        
        res.status(204).json({gallery});
    }catch(e){
        res.status(500).json({"message" : e.message});
    }
})



module.exports=router;

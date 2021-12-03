const express = require("express");

//const path = require("path")
const fs = require("fs");

const Product = require("../models/product.model");

const upload =require("../middleware/uploads")

const router = express.Router();

router.post("/", upload.single("Profic_pic"), async (req, res) => {
    try {
        const product = await Product.create({
            first_name: req.body.product_name,
            last_name: req.body.price,
            Profile_pic: req.file.path,
        });
        return res.status(201).json({ product })
    }
    catch (e) {
        res.status(500).json({ "message": e.message, "status": "Failed" });
    }
});
router.post("/multiple", upload.any("Profile_pic"), async (req, res) => {

    const filepaths=req.files.map((file)=>file.path)
    try {
        const product = await Product.create({
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            Profile_pic: filepaths,
        });
        return res.status(201).json({ product })
    }
    catch (e) {
        res.status(500).json({ "message": e.message, "status": "Failed" });
    }
});
router.patch("/:id",upload.single("Profile_pic"),async(req,res)=>{

    if(req.file.path)
    {
        const path = await Product.findById(req.params.id,{"Profile_pic" : 1}).lean().exec();
        fs.unlink(path.Profile_pic,(err)=>{
            if(err)
            {
                console.log(err);
            }
        })
    }

    const user = await Product.findByIdAndUpdate(req.params.id,{

        "first_name" : req.body.first_name,

        "last_name" : req.body.last_name,

        "Profile_pic" : req.file.path,

    },{
        new:true,
    }).lean().exec();

    res.status(201).json({user});
});
router.delete("/:id",async(req,res)=>{

    const user = await Product.findByIdAndDelete(req.params.id).lean().exec();

    res.status(204).json({user});
});


module.exports=router;

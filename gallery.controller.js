const express = require("express");

//const path = require("path")

const Gallery = require("../models/gallery.model");

const upload =require("../middleware/uploads")

const router = express.Router();


router.post("/multiple", upload.any("image_urls"), async (req, res) => {

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
router.get("/", upload.any("image_urls"), async (req, res) => {

    const filepaths=req.files.map((file)=>file.path)
    try {
        const gallery = await Gallery.find().populate("user_id");
        return res.status(201).json({ gallery })
    }
    catch (e) {
        res.status(500).json({ "message": e.message, "status": "Failed" });
    }
});



module.exports=router;

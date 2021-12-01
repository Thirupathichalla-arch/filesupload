const express = require("express");

//const path = require("path")

const Product = require("../models/product.model");

const upload =require("../middleware/uploads")

const router = express.Router();

router.post("/", upload.single("image_urls"), async (req, res) => {
    try {
        const product = await Product.create({
            product_name: req.body.product_name,
            price: req.body.price,
            image_urls: req.file.path,
        });
        return res.status(201).json({ product })
    }
    catch (e) {
        res.status(500).json({ "message": e.message, "status": "Failed" });
    }
});
router.post("/multiple", upload.any("image_urls"), async (req, res) => {

    const filepaths=req.files.map((file)=>file.path)
    try {
        const product = await Product.create({
            product_name: req.body.product_name,
            price: req.body.price,
            image_urls: filepaths,
        });
        return res.status(201).json({ product })
    }
    catch (e) {
        res.status(500).json({ "message": e.message, "status": "Failed" });
    }
});


module.exports=router;

import cakeModel from "../models/cakeModel.js";
import fs from 'fs'


const addCake = async (req, res) =>{
    let image_filename = `${req.file.filename}`;

    const cake = new cakeModel({
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        image: image_filename
    });
    try {
        await cake.save();
        res.json({
            success: true,
            message: "Food Added"
        })
    } catch (error) {
        console.log(error);
        res.json({success: false,
            message: "Error"
        })
    }
}

const listCake = async (req, res) =>{
    try {
        const cakes = await cakeModel.find({});
        res.json({
            success: true,
            data: cakes
        })
    } catch (error) {
        console.log(error);
        res.json({success: false, 
            message: "Error"
        })
    }
}
const removeCake = async (req, res) =>{
    try{
        const cake = await cakeModel.findById(req.body.id);
        fs.unlink(`uploads/${cake.image}`, ()=>{});

        await cakeModel.findByIdAndDelete(req.body.id);
        res.json({success: true, message: "Cake Removed"});
    }
    catch(error){
        console.log(error);
        res.json({success: false, message: "Error"});
    }
}

export {addCake, listCake, removeCake}
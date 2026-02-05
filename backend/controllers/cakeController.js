import cakeModel from "../models/cakeModel.js";
import fs from 'fs'
import userModel from "../models/userModel.js";


const addCustomCake = async (req, res) => {
  try {
    const { name, price, image, description } = req.body;
    const {userId} = req.user;

    if (!name || !price || !image || !description) {
      return res.json({ success: false, message: "Missing fields" });
    }

    const cake = new cakeModel({
      name,
      price,
      image,            
      description,      
      isCustom: true,
      createdBy: userId
    });

    await cake.save();

    res.json({
      success: true,
      message: "Custom cake created successfully",
      cake
    });

  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Server error" });
  }
};


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

export {listCake, removeCake, addCustomCake}
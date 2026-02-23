import cakeModel from "../models/cakeModel.js";
import userModel from "../models/userModel.js";
import { v2 as cloudinary } from "cloudinary";

const addCustomCake = async (req, res) => {
  try {
    const { name, price, image, description } = req.body;
    const { userId } = req.user;

    if (!name || !price || !image || !description) {
      return res.json({ success: false, message: "Missing fields" });
    }

    const uploadResult = await cloudinary.uploader.upload(image, {
          resource_type: "image",
        });

    const cake = new cakeModel({
      name,
      price,
      image: uploadResult.secure_url,
      description,
      isCustom: true,
      createdBy: userId,
    });

    await cake.save();

    res.json({ success: true, message: "Custom cake created successfully", cake });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Server error" });
  }
};

const listCake = async (req, res) => {
  try {
    const cakes = await cakeModel.find({})
      .populate("createdBy", "name");
    res.json({ success: true, data: cakes });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
};

const removeCake = async (req, res) => {
  try {
    const cake = await cakeModel.findById(req.body.id);

    // Cloudinary se bhi delete karo
    if (cake.image) {
      const publicId = cake.image.split("/").pop().split(".")[0];
      await cloudinary.uploader.destroy(`cakecraft/${publicId}`);
    }

    await cakeModel.findByIdAndDelete(req.body.id);
    res.json({ success: true, message: "Cake Removed" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
};

export { listCake, removeCake, addCustomCake };
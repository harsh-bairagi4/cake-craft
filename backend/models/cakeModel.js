import mongoose from "mongoose";

const cakeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    price: {
        type: Number,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    description:{
      flavor: String,
      size: String,
      layers: String,
      frosting: String,
      shape: String,
      eggType: String,
      sweetness: String,
      toppings: [String],
      message: String,
    },
    isCustom: {
        type: Boolean,
        default: false,
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        default: null,
    },
}, {
    timestamps: true,
});

const cakeModel = mongoose.models.cake || mongoose.model("cake", cakeSchema);

export default cakeModel;
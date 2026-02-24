import userModel from "../models/userModel.js"

const addToCart = async (req, res) => {
    try {
        const { userId } = req.user;
        const userData = await userModel.findById(userId);
        let cartData = userData.cartData;
        if (!cartData[req.body.itemId]) {
            cartData[req.body.itemId] = 1;
        }
        else {
            cartData[req.body.itemId] += 1;
        }
        await userModel.findByIdAndUpdate(userId,
            { cartData }
        );
        res.json({ success: true, message: "Cake added to cart successfully 🎉" });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" });
    }
}

const removeFromCart = async (req, res) => {
    try {
        const { userId } = req.user;
        const userData = await userModel.findById(userId);
        let cartData = userData.cartData;
        if (cartData[req.body.itemId] > 1) {
            cartData[req.body.itemId] -= 1;
        } else {
            delete cartData[req.body.itemId];
        }
        await userModel.findByIdAndUpdate(userId, { cartData });
        res.json({ success: true, message: "Removed From Cart" });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" })

    }
}

const getCart = async (req, res) => {
    try {
        const { userId } = req.user;
        const userData = await userModel.findById(userId);

        if (!userData) {
            return res.json({ success: false, message: "User not found" });
        }

        let cartData = await userData.cartData;
        res.json({ success: true, cartData })
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" });
    }
}

const deleteFromCart = async (req, res) => {
    try {
        const { userId } = req.user;
        const { itemId } = req.body;

        if (!itemId) {
            return res.json({
                success: false,
                message: "Item ID is required"
            });
        }

        const updatedUser = await userModel.findByIdAndUpdate(
            userId,
            { $unset: { [`cartData.${itemId}`]: "" } },
            { new: true }
        );
        if (!updatedUser) {
            return res.json({
                success: false,
                message: "User not found"
            });
        }
        res.json({
            success: true,
            message: "Item removed from cart",
            cartData: updatedUser.cartData,
        });
    }
    catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error deleting item" });
    }
}

export { addToCart, removeFromCart, getCart, deleteFromCart }
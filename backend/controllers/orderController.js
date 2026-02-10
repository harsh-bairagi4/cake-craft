import "dotenv/config"
import userModel from "../models/userModel.js"
import orderModel from "../models/orderModel.js"
import Stripe from "stripe"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const placeOrder = async (req, res) => {

    try{
         const {userId} = req.user;
        const newOrder = new orderModel({
            userId: userId,
            items: req.body.items,
            amount: req.body.amount,
            address: req.body.address,
            paymentMethod: "Stripe"
        });
        await newOrder.save();
        await userModel.findByIdAndUpdate(userId, {
            cartData: {}});
         const line_items = req.body.items.map((item) => ({
      price_data: {
        currency: "inr",
        product_data: {
          name: item.name,
        },
        unit_amount: item.price *100
      },
      quantity: item.quantity
    }));
    line_items.push({
      price_data: {
        currency: "inr",
        product_data: {
          name: "Delivery Charges",
        },
        unit_amount: 50*100,
      },
      quantity: 1,
    });
  
    const session = await stripe.checkout.sessions.create({
      line_items: line_items,
      mode: "payment",
      success_url: `${process.env.FRONTEND_URL}/verify?success=true&orderId=${newOrder._id}`,
      cancel_url: `${process.env.FRONTEND_URL}/verify?success=false&orderId=${newOrder._id}`,
    });
    res.json({ success: true, session_url: session.url });
        
    }
    catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
}

const placeOrderCod = async (req, res) =>{
  try {
      const {userId} = req.user;
        const newOrder = new orderModel({
            userId: userId,
            items: req.body.items,
            amount: req.body.amount,
            address: req.body.address,
            paymentMethod: "COD"
        });
        await newOrder.save();

        await userModel.findByIdAndUpdate(userId, {
            cartData: {}});
        res.json({success: true, message: "Order Placed"});
  } catch (error) {
    console.log(error);
    res.json({success: false, message: error.message});
  }
 
}

const verifyOrder = async (req, res)=>{
  const {orderId, success} = req.body;
  try{
    if(success=="true"){
      await orderModel.findByIdAndUpdate(orderId, {payment: true});
      res.json({success: true, message: "Paid"});
    }
    else{
      await orderModel.findByIdAndDelete(orderId);
      res.json({success: false, message: "Not Paid" });
    }
  }catch(error){
    console.log(error.message);
    res.json({success: false, message: "Error"});
  }
}

const userOrders = async (req, res) => {
  try {
    const { userId } = req.user;

    // ✅ find orders by userId field
    const orders = await orderModel.find({ userId }).sort({ date: -1 });

    res.json({
      success: true,
      orders,
    });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error fetching orders" });
  }
};


const listOrders = async (req, res) => {
  try{
    const orders = await orderModel.find({});
    res.json({success: true, data: orders});
  }
  catch(error){
    console.log(error);
    res.json({success: false, message: "Error"});
  }
}

const updateStatus = async(req, res)=>{
  try{
    await orderModel.findByIdAndUpdate(req.body.orderId, {status: req.body.status});
    res.json({success: true, message: "Status Updated"})
  }catch(error){
    console.log(error);
    res.json({success: false, message: "Error"});
  }
}
export { placeOrder,placeOrderCod, verifyOrder ,userOrders, listOrders, updateStatus};

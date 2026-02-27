🍰 CakeCraft – AI Powered Custom Cake Builder (MERN Stack)

A full-stack AI-powered cake customization and ordering platform built using the MERN stack.

CakeCraft allows users to generate unique AI-based cake designs, add to cart, place secure orders, and see their creations featured in the community collection.

This project demonstrates real-world full-stack architecture including authentication, database relationships, cart management, AI image generation, payments, and production-ready API design.

✨ Highlights

AI-powered custom cake image generation

Full cart & order workflow

JWT authentication & protected routes

Infinite auto-scroll cake showcase

Skeleton loading UI

Smooth animations (Framer Motion + GSAP)

Interactive UI components (Swiper, Lottie)

Stripe payment integration

Cloudinary image storage

MongoDB relational population

Production-style REST APIs

🚀 Features
👤 User Side

Design your own cake using AI prompt generation

Select flavor, size, shape, layers, frosting, sweetness, toppings, egg type

Add to cart with quantity control (max limit validation)

Real-time toast notifications (Sonner)

Secure login & authentication using JWT

Place orders via Stripe payment gateway

View order history

Explore cakes designed by community members

Smooth loading skeletons for premium UX

Responsive modern UI with animations

🧠 AI Workflow

User selects cake configuration

Backend generates AI image

Custom cake stored in database

User can order as well as publish to community collection

🛠 Admin / Backend Capabilities

RESTful APIs using Express 5

JWT authentication & route protection

Cart add / remove / delete APIs

Order creation & status management

MongoDB relational references 

Stripe Payment Intent integration

Cloudinary for image storage

Environment-based secure configuration

⚙️ Tech Stack
🎨 Frontend

React 19 (Vite)

React Router DOM

Framer Motion

GSAP

Swiper.js

Three.js

Lottie React

Sonner (Toast notifications)

Axios

🖥 Backend

Node.js

Express.js (v5)

MongoDB

Mongoose

JWT (jsonwebtoken)

Bcrypt

Stripe

Cloudinary

Validator

Dotenv

CORS

🗄 Database

MongoDB Atlas

📁 Project Structure
root/
│
├── frontend/          # React client (Vite)
├── backend/           # Express API
│
├── .env
├── package.json
└── README.md
🔐 Authentication Flow

User registers or logs in

Backend generates JWT

Token stored in frontend

Protected routes verified using middleware

Cart & order routes require authentication

🛒 Cart System

Add to cart

Remove quantity

Delete item completely

Max quantity validation (8 per item)

Persistent cart storage (backend synced)

💳 Payment Integration

Stripe Payment Intent API

Secure checkout flow

Cash on Delivery Feature

Order stored after successful payment

Order status updates supported

🌍 Deployment

Frontend deployed using Vercel

Backend deployed using Railway

MongoDB hosted on MongoDB Atlas

Cloudinary for image hosting

Stripe for secure payments

Environment variables for sensitive data

🧪 Development Scripts
Frontend
npm run dev
npm run build
npm run preview
Backend
npm run server   # nodemon
npm start        # production
🎯 What This Project Demonstrates

Full-stack MERN architecture

Secure authentication & middleware

API design best practices

Database relationship handling

Real-time UI updates

Payment gateway integration

Scalable project structure

Production-level UX design

📌 Future Improvements

Wishlist feature

Advanced filtering & search

Admin dashboard

AI style presets

Email notifications

Performance optimization & caching

🙌 Author

Built with ❤️ by Harsh Bairagi

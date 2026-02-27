# 🍰 CakeCraft – AI Powered Custom Cake Builder

> A full-stack AI-powered cake customization and ordering platform built using the MERN stack.

CakeCraft allows users to generate unique AI-based cake designs, add to cart, place secure orders, and see their creations featured in the community collection.

---

## ✨ Highlights

- 🤖 AI-powered custom cake image generation
- 🛒 Full cart & order workflow
- 🔐 JWT authentication & protected routes
- ♾️ Infinite auto-scroll cake showcase
- 💀 Skeleton loading UI
- 🎞️ Smooth animations (Framer Motion + GSAP)
- 🎠 Interactive UI components (Swiper, Lottie)
- 💳 Stripe payment integration
- ☁️ Cloudinary image storage
- 🗃️ MongoDB relational population
- 🔌 Production-style REST APIs

---

## 🚀 Features

### 👤 User Side

- Design your own cake using AI
- Select flavor, size, shape, layers, frosting, sweetness, toppings, egg type
- Add to cart with quantity control (max limit validation)
- Real-time toast notifications (Sonner)
- Secure login & authentication using JWT
- Place orders via Stripe payment gateway
- View order history
- Explore cakes designed by community members
- Smooth loading skeletons for premium UX
- Responsive modern UI with animations

### 🧠 AI Workflow

1. User selects cake configuration
2. Backend generates AI image
3. Custom cake stored in database
4. User can order as well as publish to community collection

### 🛠️ Admin / Backend Capabilities

- RESTful APIs using Express 5
- JWT authentication & route protection
- Cart add / remove / delete APIs
- Order creation & status management
- MongoDB relational references
- Stripe Payment Intent integration
- Cloudinary for image storage
- Environment-based secure configuration

---

## ⚙️ Tech Stack

### 🎨 Frontend

| Tech | Purpose |
|------|---------|
| React 19 (Vite) | UI Framework |
| React Router DOM | Client-side routing |
| Framer Motion | Animations |
| GSAP | Advanced animations |
| Swiper.js | Carousels |
| Three.js | 3D effects |
| Lottie React | Lottie animations |
| Sonner | Toast notifications |
| Axios | HTTP client |

### 🖥️ Backend

| Tech | Purpose |
|------|---------|
| Node.js | Runtime |
| Express.js (v5) | Web framework |
| MongoDB + Mongoose | Database & ODM |
| JWT | Authentication |
| Bcrypt | Password hashing |
| Stripe | Payments |
| Cloudinary | Image storage |
| Validator | Input validation |
| CORS + Dotenv | Config & security |

### 🗄️ Database

- **MongoDB Atlas** – Cloud-hosted database

---

## 📁 Project Structure

```
root/
│
├── frontend/          # React client (Vite)
├── backend/           # Express API
│
├── .env
├── package.json
└── README.md
```

---

## 🔐 Authentication Flow

1. User registers or logs in
2. Backend generates JWT
3. Token stored in frontend
4. Protected routes verified using middleware
5. Cart & order routes require authentication

---

## 🛒 Cart System

- Add to cart
- Remove quantity
- Delete item completely
- Max quantity validation (8 per item)
- Persistent cart storage (backend synced)

---

## 💳 Payment Integration

- Stripe Payment Intent API
- Secure checkout flow
- Cash on Delivery option
- Order stored after successful payment
- Order status updates supported

---

## 🌍 Deployment

| Layer | Service |
|-------|---------|
| Frontend | Vercel |
| Backend | Railway |
| Database | MongoDB Atlas |
| Images | Cloudinary |
| Payments | Stripe |

> All sensitive data managed via environment variables.

---

## 🧪 Development Scripts

### Frontend

```bash
npm run dev       # Start dev server
npm run build     # Production build
npm run preview   # Preview build
```

### Backend

```bash
npm run server    # Dev mode (nodemon)
npm start         # Production mode
```

---

## 🎯 What This Project Demonstrates

- Full-stack MERN architecture
- Secure authentication & middleware
- API design best practices
- Database relationship handling
- Real-time UI updates
- Payment gateway integration
- Scalable project structure
- Production-level UX design

---

## 📌 Future Improvements

- [ ] Wishlist feature
- [ ] Advanced filtering & search
- [ ] Admin dashboard
- [ ] AI style presets
- [ ] Email notifications
- [ ] Performance optimization & caching

---

## 🙌 Author

Built with ❤️ by **Harsh Bairagi**
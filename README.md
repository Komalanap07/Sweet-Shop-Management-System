🍬 Sweet Shop (MERN Stack)

A full-stack Sweet Shop web application built using MongoDB, Express, React, and Node.js (MERN stack).
It allows users to browse sweets, search, purchase, and manage inventory. Admins can add, update, and delete sweets with image uploads.

🚀 Features

🛒 Browse & Search: View all sweets with categories, price, and quantity.

🎯 Purchase System: Users can buy sweets (stock decreases automatically).

📷 Image Upload: Admins can upload images of sweets.

🔐 Authentication: Secure login for users and admin roles.

⚡ CRUD for Admins: Create, update (including image change), and delete sweets.

🔎 Filter/Search API: Search sweets by name, category, or price range.

📱 Responsive UI: Built with React + Tailwind CSS.

🛠️ Tech Stack
Frontend

React.js

Tailwind CSS

Axios

Framer Motion

Backend

Node.js

Express.js

Multer (file upload)

MongoDB + Mongoose

📂 Project Structure
sweet-shop/
│── backend/
│   ├── models/       # Mongoose models
│   ├── routes/       # Express routes
│   ├── middleware/   # Auth middlewares
│   ├── server.js     # Main server
│   └── uploads/      # Uploaded sweet images
│
│── frontend-sweetshop/
│   ├── src/
│   │   ├── components/  # React components
│   │   ├── pages/       # App pages
│   │   └── api.js       # Axios setup
│   └── vite.config.js
│
└── README.md

⚙️ Installation & Setup
1️⃣ Clone Repo
git clone https://github.com/Komalanap07/Sweet-Shop-Management-System.git
cd sweet-shop

2️⃣ Backend Setup
cd backend
npm install


Create a .env file:

MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
PORT=5000


Run server:

npm run dev

3️⃣ Frontend Setup
cd ../frontend-sweetshop
npm install
npm run dev

🌐 API Endpoints
Sweets

GET /api/sweets → Get all sweets

GET /api/sweets/:id → Get sweet by ID

POST /api/sweets → Add sweet (admin only)

PUT /api/sweets/:id → Update sweet (admin only, supports new image upload)

DELETE /api/sweets/:id → Delete sweet (admin only)

POST /api/sweets/:id/purchase → Purchase sweet

POST /api/sweets/:id/restock → Restock sweet (admin only)

👨‍💻 Author

Developed by Komal Anap ✨

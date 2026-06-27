# 🛒 CartiFy - Premium E-Commerce Platform

CartiFy is a full-stack MERN (MongoDB, Express, React, Node.js) e-commerce application featuring a modern user experience, live dynamic search with auto-suggestions, and advanced product sorting.


## ✨ Features

- **👤 User Authentication:** Secure JWT-based login and registration with encrypted passwords (bcryptjs).
- **📦 Product Management:** Dynamic product grid rendering directly from MongoDB.
- **🔍 Smart Search & Suggestions:** Implemented real-time product filtering as you type with a clean UI dropdown suggestion list.
- **🎯 Intelligent Sorting:** Search queries automatically push the closest/exact matches to the top of the product grid.
- **🛒 Complete Checkout Workflow:** Fully functional cart system, shipping address manager, payment method selection, and checkout/order breakdown billing box.
- **⚙️ Seamless Architecture:** Unified monolithic repo structure configures both frontend and backend to run seamlessly on Serverless Platforms (Vercel).

---

## 🛠️ Tech Stack

### Frontend
- React.js (Hooks, Context API, Router)
- Axios (API Handling)
- CSS3 (Responsive Grid Layouts & Themes)

### Backend
- Node.js & Express.js
- MongoDB & Mongoose (ODM)
- JSON Web Tokens (JWT) & Bcrypt.js

---

## ⚙️ Installation & Local Setup

Follow these steps to run CartiFy locally on your computer:

### 1. Clone the repository
```bash
git clone [https://github.com/Luckyy750/Cartify.git](https://github.com/Luckyy750/Cartify.git)
cd Cartify

2. Setup Backend Dependencies
Go to the root folder and install packages:
npm install

3. Setup Frontend Dependencies
Go to the frontend directory and install packages:

Bash
cd frontend
npm install
cd ..

4. Configuration (.env)
Create a .env file inside the Backend folder and add your environment credentials:

Code snippet
PORT=5000
MONGO_URI=your_mongodb_atlas_connection_string
JWT_SECRET=your_jwt_secret_key

5. Run the Application
To run the server and client concurrently or individually:

Run in development mode (with nodemon):

Bash
npm run dev


📦 Deployment Configuration
The repository contains a custom configured vercel.json file to manage serverless functions routing seamlessly between the Express API routes (/api/*) and React's static production builds.

JSON
{
  "version": 2,
  "builds": [
    { "src": "backend/server.js", "use": "@vercel/node" },
    { "src": "frontend/package.json", "use": "@vercel/static-build" }
  ]
}
👤 Author
Lucky Chouksey 

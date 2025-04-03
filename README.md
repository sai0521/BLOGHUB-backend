
# Blog Application Backend

## 📖 Overview
Node.js/Express backend API for a blog platform with MongoDB integration. Handles user authentication, blog management, and serves RESTful endpoints.

## 🚀 Features
- JWT-based user authentication
- CRUD operations for blog posts
- MongoDB data storage
- Pagination & sorting
- Rate limiting & security
- Error handling & validation

## 🛠 Tech Stack
- **Runtime**: Node.js
- **Framework**: Express
- **Database**: MongoDB (Mongoose ODM)
- **Authentication**: JSON Web Tokens (JWT)
- **Security**: Helmet, CORS, Rate Limiter
- **Environment**: Dotenv

## ⚙️ Setup

### Prerequisites
- Node.js v18.x or higher
- MongoDB Atlas cluster or local instance
- Postman/Insomnia for API testing

### Installation
1. Clone repository:
```bash
git clone https://github.com/yourusername/blog-api-backend.git
cd blog-api-backend
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env` file:
```env
PORT=5000
MONGO_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/blogdb?retryWrites=true&w=majority
JWT_SECRET=your_strong_secret_key_here
JWT_EXPIRES_IN=1h
RATE_LIMIT_WINDOW_MS=900000  # 15 minutes
RATE_LIMIT_MAX=100           # 100 requests per window
```

4. Start server:
```bash
# Development
npm run dev

# Production
npm start
```

## 📡 API Endpoints

| Method | Endpoint          | Description                | Auth Required |
|--------|-------------------|----------------------------|---------------|
| POST   | /api/register     | Register new user          | No            |
| POST   | /api/login        | User login                 | No            |
| GET    | /api/blogs        | Get paginated blogs        | No            |
| POST   | /api/blogs        | Create new blog post       | Yes (JWT)     |
| GET    | /api/blogs/:id    | Get single blog post       | No            |
| PUT    | /api/blogs/:id    | Update blog post           | Yes (JWT)     |
| DELETE | /api/blogs/:id    | Delete blog post           | Yes (JWT)     |
| GET    | /api/user/blogs   | Get user's blogs           | Yes (JWT)     |

## 🔒 Authentication
- Register: `POST /api/register` with { name, email, password }
- Login: `POST /api/login` with { email, password }
- Include JWT in `Authorization: Bearer <token>` header for protected routes

## 🚀 Deployment
1. Create production build:
```bash
npm run build
```

2. Start in production:
```bash
node dist/index.js
```

3. Recommended:
- Use PM2 process manager: `pm2 start dist/index.js`
- Host on AWS EC2, DigitalOcean, or Heroku
- Use MongoDB Atlas for cloud database

## 🐛 Testing
Run automated tests:
```bash
npm test
```

## 📂 Project Structure
```
/
├── config/         # Configuration files
├── controllers/    # Route controllers
├── models/         # MongoDB models
├── routes/         # Express routers
├── middlewares/    # Custom middleware
└── utils/          # Helper functions
```

## 📜 License
MIT License - See LICENSE file for details
```



# EduVerse 3D Backend API

Complete Node.js + Express + MongoDB backend for the EduVerse 3D learning platform.

## Features

- 🔐 JWT Authentication with bcrypt password hashing
- 👥 Role-based access (Student, Teacher, Parent)
- 📝 Quiz management and scoring
- 📊 Progress tracking and gamification
- 🎯 3D model management
- 🤖 AI Chatbot integration (OpenAI)
- ✅ Input validation and error handling

## Prerequisites

- Node.js (v16 or higher)
- MongoDB Atlas account (free tier works)
- OpenAI API key (for chatbot feature)

## Setup Instructions

### 1. Install Dependencies

```bash
cd backend
npm install
```

### 2. Configure Environment Variables

Create a `.env` file in the backend directory:

```bash
cp .env.example .env
```

Edit `.env` with your actual credentials:

```env
MONGODB_URI=mongodb+srv://your-username:your-password@cluster.mongodb.net/eduverse3d?retryWrites=true&w=majority
JWT_SECRET=your_very_secure_random_secret_key_here
OPENAI_API_KEY=sk-your-openai-api-key
PORT=5000
```

**Getting MongoDB URI:**
1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a free cluster
3. Click "Connect" → "Connect your application"
4. Copy the connection string and replace `<password>` with your database user password

**Getting OpenAI API Key:**
1. Go to [OpenAI Platform](https://platform.openai.com/)
2. Create an account and navigate to API keys
3. Create a new secret key

### 3. Seed the Database

Populate the database with sample data:

```bash
npm run seed
```

This creates sample users, quizzes, 3D models, and progress data.

**Sample Login Credentials:**
- Student: `rahul@student.com` / `password123`
- Teacher: `priya@teacher.com` / `password123`
- Parent: `sharma@parent.com` / `password123`

### 4. Start the Server

**Development mode (with auto-reload):**
```bash
npm run dev
```

**Production mode:**
```bash
npm start
```

The server will run on `http://localhost:5000`

## API Endpoints

### Authentication

- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user (requires auth)

### Quizzes

- `GET /api/quiz/topic/:topicId` - Get quiz by topic (requires auth)
- `POST /api/quiz/topic/:topicId/submit` - Submit quiz answers (student only)
- `GET /api/quiz/all` - Get all quizzes (teacher only)

### Progress

- `GET /api/progress` - Get student progress (student only)
- `GET /api/progress/subject/:subject` - Get progress by subject (student only)
- `POST /api/progress/streak` - Update streak (student only)

### 3D Models

- `GET /api/models` - Get all 3D models (requires auth)
- `GET /api/models/topic/:topicId` - Get model by topic (requires auth)
- `GET /api/models/subject/:subject` - Get models by subject (requires auth)

### Chatbot

- `POST /api/chatbot/chat` - Send message to AI tutor (requires auth)

## Frontend Integration

Update your frontend's API configuration to point to this backend:

```typescript
// In your frontend code
const API_BASE_URL = 'http://localhost:5000/api';

// For production, use your deployed backend URL
// const API_BASE_URL = 'https://your-backend.onrender.com/api';
```

All protected endpoints require an Authorization header:

```typescript
headers: {
  'Authorization': `Bearer ${token}`,
  'Content-Type': 'application/json'
}
```

## Deployment

### Deploy to Render (Recommended)

1. Push your backend code to GitHub
2. Go to [Render](https://render.com/)
3. Create a new "Web Service"
4. Connect your GitHub repository
5. Configure:
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`
   - **Environment Variables:** Add all variables from `.env`
6. Deploy!

### Deploy to Railway

1. Install Railway CLI: `npm i -g @railway/cli`
2. Login: `railway login`
3. Initialize: `railway init`
4. Add environment variables: `railway variables`
5. Deploy: `railway up`

### Deploy to Vercel (Serverless)

1. Install Vercel CLI: `npm i -g vercel`
2. Run: `vercel`
3. Follow the prompts
4. Add environment variables in Vercel dashboard

## Project Structure

```
backend/
├── config/
│   └── db.js              # MongoDB connection
├── controllers/
│   ├── authController.js  # Authentication logic
│   ├── quizController.js  # Quiz management
│   ├── progressController.js # Progress tracking
│   ├── modelController.js # 3D models
│   └── chatbotController.js # AI chatbot
├── middleware/
│   └── auth.js           # JWT authentication middleware
├── models/
│   ├── User.js           # User schema
│   ├── Quiz.js           # Quiz schema
│   ├── Progress.js       # Progress schema
│   └── Model.js          # 3D Model schema
├── routes/
│   ├── auth.js           # Auth routes
│   ├── quiz.js           # Quiz routes
│   ├── progress.js       # Progress routes
│   ├── model.js          # Model routes
│   └── chatbot.js        # Chatbot routes
├── .env.example          # Environment variables template
├── package.json          # Dependencies
├── seedData.js           # Database seeder
├── server.js             # Entry point
└── README.md            # This file
```

## Testing the API

Use [Postman](https://www.postman.com/) or [Thunder Client](https://www.thunderclient.com/) to test endpoints:

1. **Register a user:**
   ```json
   POST http://localhost:5000/api/auth/register
   {
     "name": "Test Student",
     "email": "test@student.com",
     "password": "password123",
     "role": "student",
     "classLevel": 8
   }
   ```

2. **Login:**
   ```json
   POST http://localhost:5000/api/auth/login
   {
     "email": "test@student.com",
     "password": "password123",
     "role": "student"
   }
   ```

3. **Get quiz (use token from login):**
   ```
   GET http://localhost:5000/api/quiz/topic/circulatory-system
   Headers: Authorization: Bearer <your-token>
   ```

## Troubleshooting

**MongoDB connection error:**
- Verify your MongoDB URI in `.env`
- Ensure your IP is whitelisted in MongoDB Atlas
- Check database user credentials

**OpenAI API errors:**
- Verify your API key is valid
- Check your OpenAI account has credits
- The chatbot uses fallback responses if API fails

**CORS errors:**
- Update CORS settings in `server.js` if frontend is on different domain
- For production, specify exact origins instead of `*`

## Security Notes

- Never commit `.env` file to version control
- Use strong JWT secrets in production
- Enable MongoDB IP whitelisting
- Implement rate limiting for production
- Use HTTPS in production

## Support

For issues or questions, please check:
- MongoDB Atlas documentation
- OpenAI API documentation
- Express.js guides

---

Built for EduVerse 3D - Making learning visual and fun! 🚀

A full‑featured YouTube clone built with the MERN stack (MongoDB, Express, React, Node). This specification provides a complete project blueprint: features, system architecture, database models, API endpoints, frontend structure, media handling, security, testing, deployment, and ideas for future improvements.

## Features

### User Authentication

-JWT-based authentication

- User registration and login
- Profile management with avatar
- Protected routes

### Video Management

- Video upload with metadata (title, description, thumbnail)
- YouTube-style video player
- Video editing and deletion (owner only)
- View count tracking
- Like/Dislike functionality

### Channel System

- Channel creation and customization
- Banner and avatar upload with preview
- Subscribe/Unsubscribe functionality
- Channel statistics (subscribers, videos)

## 🛠️ Technology Stack

### Backend

-Node.js + Express
-MongoDB (Atlas or self-managed) with Mongoose
-Redis (caching, rate-limiting, session store)
-JWT for auth, refresh tokens

#### Frontend

-React (Vite or Create React App)
-React Router for navigation
-State management: Redux Toolkit or React Context + useReducer
-UI Tailwind CSS

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/rajritukumar-code/Youtube_clone
   cd youtube-clone
   ```

2. **Set up environment variables**
   - Create `.env` file in the server directory:
     ```env
     PORT=5050
     MONGODB_URI=your_mongodb_connection_string
     JWT_SECRET=your_jwt_secret
     ```
   - For the client, create `.env` in the client directory:
     ```env
     VITE_API_URL=http://localhost:5050/api
     ```
3. **Install dependencies**

   ```bash
   # Install backend dependencies
   cd Backend
   npm install

   # Install frontend dependencies
   cd ../client
   npm install
   ```

**Run the application**

- Start the backend server:
  ```bash
  cd Backend
  npm
  ```
  - Seed sample data to database:
  ```bash
  cd backend
  npm run seed
  ```
- In a new terminal, start the frontend:

  ```bash
  cd client
  npm start
  ```

  **Access the application**

- Frontend: http://localhost:5173
- Backend API: http://localhost:5050/api

## 📚 API Documentation

### Authentication

- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - User login
- `GET /api/auth/verify` - Verify JWT token

### Users

- `PUT /api/users/profile` - Update user profile

### Channels

- `GET /api/channels/:channelId` - Get channel by
- `POST /api/channels` - Create new channel
- `PUT /api/channels/:ChannelId` - Update channel
- `GET /api/my-channel` - Get user's channel
- `GET /api/channels/:channelId/exist` Checks channel exist
- `DELETE /api/channels/:channelId` - Delete channel
- `POST /api/channels/:channelId/subscribe` - Subscribe to channel
- `GET /api/channels/:channelId/subscription-status` - Check subscription status

### Videos

- `GET /api/videos` - Get all videos
- `GET /api/videos/:video Id` - Get video details
- `POST /api/videos` - Upload new video
- `GET /api/videos/:videoId/exist` Checks video exist
- `PUT /api/videos/:videoId` - Update video
- `DELETE /api/videos/:videoId` - Delete video
- `PUT /api/videos/:videoId/like` - Toggle like/dislike
- `GET /api/videos/:videoId/like-status` - Get user's like status
- `/api/channels/:channelId/videos` - Get videos by channel

### Comments

- `GET /api/comments/video/:videoId` - Get video comments
- `POST /api/comments` - Add new comment
- `PUT /api/comments/:id` - Update comment
- `DELETE /api/comments/:id` - Delete comment
- `PUT /api/comments/:id/like` - Toggle comment like/dislike
- `GET /api/comments/:id/like-status` - Get user's like status

## 📈 Performance Optimizations

- **Lazy Loading** for components and images
  **Code Splitting** for optimized bundle sizes

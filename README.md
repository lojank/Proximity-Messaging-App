# Proximity Messaging App
A real-time messaging application that allows users to communicate based on their proximity.

## Features
- User authentication (login/register/logout)
- Real-time messaging between users
- Geolocation-based user proximity

## Technologies Used
- Node.js
- Express
- MongoDB (Mongoose)
- React
- Socket.IO
- bcrypt for password hashing

## Installation
Ensure you have Node.js and MongoDB installed on your system. Follow these steps to run the project locally

1. Clone the respository
2. Install dependencies for both server and client:
```
cd server
npm install
cd ../client
npm install
```
3. Create a .env file in the client and server directories:

`client/.env`:
```
REACT_APP_LOCALHOST_KEY="chat-app-user"
```

`server/.env`:
```
PORT=5001
MONGO_URL=your_mongodb_connection_string
```

## Usage
1. Navigate to the server directory: `npm start`
2. Navigate to the client directory: `npm start`
3. Open your browser and go to `http://localhost:3000` to access the application.

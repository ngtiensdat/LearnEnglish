module.exports = {
  apps: [
    { name: 'api-gateway', script: './backend/api-gateway/server.js', env: {
      PORT: 3010,
      MONGO_URI: 'mongodb://localhost:27017/vocabulary_db',
      JWT_SECRET: 'your_jwt_secret_here'
    } },
    { name: 'auth-service', script: './backend/auth/server.js', env: {
      PORT: 3011,
      MONGO_URI: 'mongodb://localhost:27017/vocabulary_db',
      JWT_SECRET: 'your_jwt_secret_here'
    } },
    { name: 'room-service', script: './backend/room/server.js', env: {
      PORT: 3012,
      MONGO_URI: 'mongodb://localhost:27017/vocabulary_db',
      JWT_SECRET: 'your_jwt_secret_here'
    } },
    { name: 'vocabulary-service', script: './backend/vocabulary/server.js', env: {
      PORT: 3013,
      MONGO_URI: 'mongodb://localhost:27017/vocabulary_db',
      JWT_SECRET: 'your_jwt_secret_here'
    } },
    { name: 'learning-service', script: './backend/learning/server.js', env: {
      PORT: 3014,
      MONGO_URI: 'mongodb://localhost:27017/vocabulary_db',
      JWT_SECRET: 'your_jwt_secret_here'
    } },
    { name: 'stats-service', script: './backend/stats/server.js', env: {
      PORT: 3015,
      MONGO_URI: 'mongodb://localhost:27017/vocabulary_db',
      JWT_SECRET: 'your_jwt_secret_here'
    } },
    { name: 'notification-service', script: './backend/notification/server.js', env: {
      PORT: 3016,
      MONGO_URI: 'mongodb://localhost:27017/vocabulary_db',
      JWT_SECRET: 'your_jwt_secret_here'
    } },
  ],
};
# WeatherCard

A modern, full-stack weather application built with React and Express.js that provides real-time weather information with user authentication and personalized favorites.

## 🌟 Features

- **Real-time Weather Data**: Get current weather conditions for any location worldwide
- **User Authentication**: Secure user registration and login system
- **Favorite Locations**: Save and manage your favorite weather locations
- **Progressive Web App (PWA)**: Install and use offline on any device
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Redis Caching**: Fast weather data retrieval with intelligent caching
- **REST API**: Full-featured API with Swagger documentation

## 🚀 Live Demo

![Weather App Demo](docs/front-screen.png)

*The application displays weather cards for different locations with temperature, humidity, wind speed, and other meteorological data.*

## 🏗️ Architecture

### System Overview
![Project Architecture](docs/project-architecture.png)

The application follows a microservices architecture with:
- **Frontend**: React SPA with TypeScript and Material-UI
- **Backend**: Express.js API server with TypeScript
- **Database**: MongoDB for user data and favorites
- **Cache**: Redis for weather data caching
- **External API**: OpenWeatherMap for weather data
- **Deployment**: Docker containers with Traefik reverse proxy

### Component Structure
![React Components Schema](docs/schema-react.png)

*The React application is structured with reusable components for weather cards, user authentication, and navigation.*

## 🛠️ Technology Stack

### Frontend
- **React 19** with TypeScript
- **Material-UI (MUI)** for UI components
- **Vite** for build tooling and development
- **PWA** support with service workers
- **Axios** for API communication
- **JWT** for authentication

### Backend
- **Express.js** with TypeScript
- **MongoDB** with Mongoose ODM
- **Redis** for caching
- **bcrypt** for password hashing
- **JWT** for authentication
- **Swagger** for API documentation
- **express-validator** for input validation

### DevOps & Deployment
- **Docker** & Docker Compose
- **Traefik** reverse proxy
- **Multi-stage Docker builds**
- **Production-ready configuration**

## 📋 Prerequisites

Before running this application, make sure you have:

- **Node.js** 22 or higher
- **Docker** and **Docker Compose**
- **OpenWeatherMap API key** ([Get one free here](https://openweathermap.org/api))

## 🚀 Quick Start

### Using Docker (Recommended)

1. **Clone the repository**
   ```bash
   git clone https://github.com/devleesch001/weather-card.git
   cd weather-card
   ```

2. **Configure environment variables**
   ```bash
   # Backend configuration
   cp back/.env.example back/.env
   # Edit back/.env and add your OpenWeatherMap API key
   
   # Frontend configuration  
   cp front/.env.example front/.env
   # Edit front/.env if needed (defaults should work for Docker setup)
   ```

3. **Start the application**
   ```bash
   docker compose up -d
   ```

4. **Access the application**
   - Frontend: http://localhost (or your configured domain)
   - API Documentation: http://localhost/api/docs

### Development Setup

#### Backend Development
```bash
cd back
npm install
npm run dev
```

#### Frontend Development
```bash
cd front
npm install
npm run dev
```

## 📡 API Documentation

![Swagger API Documentation](docs/swagger-api.png)

The API provides the following endpoints:

### Authentication
- `POST /api/auth/login` - User login
- `POST /api/auth/register` - User registration

### User Management
- `GET /api/user` - Get user information
- `POST /api/user` - Create new user

### Weather Data
- `GET /api/weather` - Get weather data by coordinates
- `GET /api/geoCode` - Get coordinates from location name

### Favorites
- `GET /api/favorite` - Get user's favorite locations
- `POST /api/favorite` - Add location to favorites

Full API documentation is available at `/api/docs` when running the application.

## 🗄️ Data Model

### User Schema
```javascript
{
    username: 'john_doe',
    email: 'john@example.com',
    favorites: [
        'Paris',
        'New York',
        'Tokyo'
    ],
    hashedPassword: '$2b$10$...' // bcrypt hashed
}
```

### Weather Data Structure
The application fetches and caches weather data from OpenWeatherMap API, including:
- Current temperature and "feels like" temperature
- Min/max temperatures
- Humidity percentage
- Wind speed and direction
- Weather conditions and descriptions

## ⚡ Performance & Caching

![Redis Performance](docs/redis-bench.png)

The application uses Redis for efficient weather data caching:
- **Location-based caching**: Weather data cached by coordinates
- **Search optimization**: Frequently searched locations cached
- **Automatic expiration**: Cache expires to ensure fresh data
- **Performance**: Sub-second response times for cached data

## 🐳 Docker Architecture

![Docker Architecture](docs/docker-architecture.png)

The application is fully containerized with:
- **Multi-stage builds** for optimized image sizes
- **Production-ready** configurations
- **Traefik integration** for automatic HTTPS and load balancing
- **Volume persistence** for database data
- **Network isolation** for security

### Services
- `front`: React application (served with Node.js serve)
- `back`: Express.js API server
- `mongo`: MongoDB database
- `cache`: Redis cache
- External: Traefik proxy (handles SSL and routing)

## 🔧 Configuration

### Environment Variables

#### Backend (.env)
```bash
# Server Configuration
PORT=8080

# OpenWeatherMap API Configuration
API_KEY=your_openweathermap_api_key_here

# JWT Secrets for Authentication
ACCESS_TOKEN_SECRET=your_jwt_access_secret_here
REFRESH_TOKEN_SECRET=your_jwt_refresh_secret_here

# Database Configuration
MANGODB_URL=mongodb://root:example@mongo:27017

# Redis Cache Configuration
REDIS_URL=redis://cache:6379
```

#### Frontend (.env)
```bash
# API Base URL
VITE_APP_API_URL=/api
```

## 🚀 Deployment

### Production Deployment
```bash
# Pull latest changes
git pull origin main

# Build and start services
docker compose up -d --build

# Verify deployment
docker compose logs -f
```

### SSL Configuration
The application is configured to work with Traefik for automatic SSL certificates using Let's Encrypt.

## 🐛 Troubleshooting

### Common Issues

**Docker build fails:**
- Ensure Docker and Docker Compose are installed and running
- Check that ports 80 and 8080 are not already in use
- Verify you have sufficient disk space

**Weather data not loading:**
- Verify your OpenWeatherMap API key is correctly set in `back/.env`
- Check that the API key is active and has remaining quota
- Ensure Redis is running and accessible

**Authentication issues:**
- Make sure JWT secrets are set in `back/.env`
- Check that MongoDB is running and accessible
- Verify the database connection string

**Development server issues:**
- Run `npm ci` in both `front/` and `back/` directories
- Ensure Node.js version is 22 or higher
- Check that environment variables are properly configured

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 📝 License

This project is licensed under the **GNU Affero General Public License v3.0** - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [OpenWeatherMap](https://openweathermap.org/) for weather data API
- [Material-UI](https://mui.com/) for React components
- [MongoDB](https://www.mongodb.com/) for database solution
- [Redis](https://redis.io/) for caching capabilities

## 📞 Support

If you have any questions or need help with setup, please:
1. Check the [Issues](https://github.com/devleesch001/weather-card/issues) page
2. Create a new issue with detailed information
3. Contact the maintainers

---

Made with ❤️ by the WeatherCard team



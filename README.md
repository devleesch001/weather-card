# WeatherCard

## Objective

create a React and Express application to display the weather.

This application must have user management.

## Project

### Front

![demo](assests/front-screen.png)

-----
#### schema of component :

![schema of components](assests/schema-react.png)

-----

### API
![swagger](assests/swagger-api.png)

### Architecture du project

![](assests/project-architecture.png)

### Data Model

```js
[
    {
        username: 'Alexis',
        email: 'alexis@devleeschauwer.fr',
        favorites: [
            'Foix',
            'Bastia'
        ],
        hashedPassword: '$2b$10$Uz4Dy3SRzlA3nLp6qgyK8e...',
    }
]
```

### Redis

![redis-bench](assests/redis-bench.png)

## Deploying

![docker-architecture](assests/docker-architecture.png)

```bash
docker-compose up -d
```



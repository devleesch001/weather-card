import * as React from 'react';

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
//import meteo
import ThunderstormIcon from '@mui/icons-material/Thunderstorm';
import AirIcon from '@mui/icons-material/Air';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import AcUnitIcon from '@mui/icons-material/AcUnit';
import CloudIcon from '@mui/icons-material/Cloud';
import { getWeather, WeatherDataInterface, WeatherInterface } from '../api/weather';
import { CardHeader, Typography } from '@mui/material';
import Box from '@mui/material/Box';

import * as Compass from 'cardinal-direction';

// interface pour information utilise
export interface WeatherInfoInterface {
    weatherId: number;
    temp: {
        temperature: number;
        tempFeel: number;
        tempMin: number;
        tempMax: number;
    };
    humidity: number;
    wind: {
        speed: number;
        angle: number;
        gust?: number;
    };
}

function toWeatherInfoInterface(weatherData: WeatherDataInterface): WeatherInfoInterface {
    const weatherInfo: WeatherInfoInterface = {
        weatherId: weatherData.weather[0].id ?? 0,
        temp: {
            temperature: weatherData.main.temp,
            tempFeel: weatherData.main.feels_like,
            tempMin: weatherData.main.temp_min,
            tempMax: weatherData.main.temp_max,
        },
        wind: {
            speed: weatherData.wind.speed,
            angle: weatherData.wind.deg,
            gust: weatherData.wind.gust,
        },
        humidity: weatherData.main.humidity,
    };

    return weatherInfo;
}

function WeatherCard() {
    const [weather, setWeather] = React.useState<WeatherInfoInterface | null>(null); //Hoock

    React.useEffect(() => {
        getWeather('paris').then((r) => {
            const data = r.data as WeatherDataInterface;
            const weatherInfo = toWeatherInfoInterface(data);
            setWeather(weatherInfo);
        });
    }, []);

    return (
        <>
            <a></a>
            <a />
            {weather ? (
                <Card>
                    <CardHeader
                        title={
                            weather.weatherId >= 200 && weather.weatherId <= 232 ? (
                                <ThunderstormIcon /> //orage
                            ) : weather.weatherId >= 300 && weather.weatherId <= 321 ? (
                                <ThunderstormIcon /> //bruine modif icone
                            ) : weather.weatherId >= 500 && weather.weatherId <= 531 ? (
                                <ThunderstormIcon /> //pluie legere
                            ) : weather.weatherId >= 600 && weather.weatherId <= 622 ? (
                                <AcUnitIcon /> // neige
                            ) : weather.weatherId >= 701 && weather.weatherId <= 781 ? (
                                <ThunderstormIcon /> // brouillard
                            ) : weather.weatherId == 800 ? (
                                <WbSunnyIcon /> //soleil
                            ) : weather.weatherId >= 801 && weather.weatherId <= 804 ? (
                                <CloudIcon />
                            ) : (
                                <>no data</>
                            )
                        }
                    />
                    <CardContent>
                        <Typography>{(weather.temp.temperature - 273.15).toPrecision(3)}°C</Typography>
                        <Typography>ressentit: {(weather.temp.tempFeel - 273.15).toPrecision(3)}°C </Typography>
                        <Typography>
                            Min :{(weather.temp.tempMin - 273.15).toPrecision(3)}°C -- Max:{' '}
                            {(weather?.temp.tempMax - 273.15).toPrecision(3)}°C
                        </Typography>
                        <AirIcon></AirIcon>
                        <Typography>{(weather.wind.speed * 3.6).toPrecision(3)} km/H</Typography>
                        <Typography>{Compass.degreeFromCardinal(weather.wind.angle)} </Typography>
                        {weather.wind.gust ? (
                            <Typography>{(weather.wind.gust * 3.6).toPrecision(3)} km/H</Typography>
                        ) : (
                            <></>
                        )}
                        <Typography>Humidity : {weather.humidity} % </Typography>
                    </CardContent>
                </Card>
            ) : (
                <></>
            )}
        </>
    );
}
export default React.memo(WeatherCard);

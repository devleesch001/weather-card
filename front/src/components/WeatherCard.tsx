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
import { Typography } from '@mui/material';

// interface pour information utilise
export interface WeatherInfoInterface {
    weatherId: number;
    temp: number;
    tempMin: number;
    tempMax: number;
    humidity: number;
    windSpeed: number;
}

function ActionOnWeatherInterface(weatherData: WeatherDataInterface): WeatherInfoInterface {
    const weatherInfo: WeatherInfoInterface = {
        weatherId: weatherData.weather[0].id,
        temp: weatherData.main.temp - 273.15,
        tempMin: weatherData.main.temp_min - 273.15,
        tempMax: weatherData.main.temp_max - 273.15,
        humidity: weatherData.main.humidity,
        windSpeed: weatherData.wind.speed,
    };

    return weatherInfo;
}

function WeatherCard() {
    const [weather, setWeather] = React.useState<WeatherDataInterface | null>(null); //Hoock

    React.useEffect(() => {
        getWeather('paris').then((r) => {
            const data = r.data as WeatherDataInterface;

            setWeather(data);
        });
    }, []);

    return (
        <Card>
            <CardContent>
                {weather ? (
                    weather.weather[0].id >= 200 && weather.weather[0].id <= 232 ? (
                        <ThunderstormIcon></ThunderstormIcon> //orage
                    ) : weather.weather[0].id >= 300 && weather.weather[0].id <= 321 ? (
                        <ThunderstormIcon></ThunderstormIcon> //bruine modif icone
                    ) : weather.weather[0].id >= 500 && weather.weather[0].id <= 531 ? (
                        <ThunderstormIcon></ThunderstormIcon> //pluie legere
                    ) : weather.weather[0].id >= 600 && weather.weather[0].id <= 622 ? (
                        <AcUnitIcon></AcUnitIcon> // neige
                    ) : weather.weather[0].id >= 701 && weather.weather[0].id <= 781 ? (
                        <ThunderstormIcon></ThunderstormIcon> // brouillard
                    ) : weather.weather[0].id == 800 ? (
                        <WbSunnyIcon></WbSunnyIcon> //soleil
                    ) : weather.weather[0].id >= 801 && weather.weather[0].id <= 804 ? (
                        <CloudIcon></CloudIcon>
                    ) : (
                        <></>
                    )
                ) : (
                    <>no data</>
                )}
            </CardContent>
        </Card>
    );
}
export default React.memo(WeatherCard);

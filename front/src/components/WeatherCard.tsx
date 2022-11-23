import * as React from 'react';

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
//import meteo
import ThunderstormIcon from '@mui/icons-material/Thunderstorm';
import AirIcon from '@mui/icons-material/Air';
import WbSunnyIcon from '@mui/icons-material/WbSunnyTwoTone';
import AcUnitIcon from '@mui/icons-material/AcUnit';
import CloudIcon from '@mui/icons-material/Cloud';
import { getWeather, WeatherDataInterface, WeatherInterface } from '../api/weather';
import { CardHeader, Grid, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import WaterTwoToneIcon from '@mui/icons-material/WaterTwoTone';

import * as Compass from 'cardinal-direction';
import { grey, yellow } from '@mui/material/colors';
import { AcUnitTwoTone, AirTwoTone, CloudTwoTone, ThunderstormTwoTone, WbSunnyTwoTone } from '@mui/icons-material';

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
            {weather ? (
                <Card>
                    <CardHeader title="nom de la ville" />
                    <CardContent>
                        <Grid container spacing={2} justifyContent="center" alignItems="center">
                            <Grid item xs={6} style={{ placeItems: 'center' }}>
                                <Typography>
                                    <span style={{ color: 'gold', fontSize: 50 }}>
                                        {(weather.temp.temperature - 273.15).toPrecision(3)}°C
                                    </span>
                                </Typography>
                            </Grid>
                            <Grid item xs={6} justifyContent="center" alignItems="center">
                                {weather.weatherId >= 200 && weather.weatherId <= 232 ? (
                                    <ThunderstormTwoTone sx={{ color: grey[500], fontSize: 150 }} /> //orage
                                ) : weather.weatherId >= 300 && weather.weatherId <= 321 ? (
                                    <ThunderstormTwoTone sx={{ color: grey[500], fontSize: 150 }} /> //bruine
                                ) : weather.weatherId >= 500 && weather.weatherId <= 531 ? (
                                    <ThunderstormTwoTone sx={{ color: grey[500], fontSize: 150 }} /> //pluie legere
                                ) : weather.weatherId >= 600 && weather.weatherId <= 622 ? (
                                    <AcUnitTwoTone sx={{ color: grey[500], fontSize: 150 }} /> // neige
                                ) : weather.weatherId >= 701 && weather.weatherId <= 781 ? (
                                    <ThunderstormTwoTone sx={{ color: grey[500], fontSize: 150 }} /> // brouillard
                                ) : weather.weatherId == 800 ? (
                                    <WbSunnyTwoTone sx={{ color: yellow[500], fontSize: 150 }} /> //soleil
                                ) : weather.weatherId >= 801 && weather.weatherId <= 804 ? (
                                    <CloudTwoTone sx={{ color: grey[500], fontSize: 150 }} />
                                ) : (
                                    <>no data</>
                                )}
                            </Grid>

                            <Grid item xs={6} justifyContent="center" alignItems="center">
                                <Typography>
                                    <span style={{ color: 'black', fontSize: 30 }}>
                                        {(weather.wind.speed * 3.6).toPrecision(3)} km/H
                                    </span>
                                </Typography>
                                <Typography>
                                    <span style={{ color: 'black', fontSize: 30 }}>
                                        {Compass.degreeFromCardinal(weather.wind.angle)}
                                    </span>
                                </Typography>
                                {weather.wind.gust ? (
                                    <Typography>
                                        <span style={{ color: 'black', fontSize: 30 }}>
                                            {(weather.wind.gust * 3.6).toPrecision(3)} km/H
                                        </span>
                                    </Typography>
                                ) : (
                                    <></>
                                )}
                            </Grid>
                            <Grid item xs={6} justifyContent="center" alignItems="center">
                                <AirTwoTone sx={{ color: 'grey', fontSize: 150, position: 'central' }} />
                            </Grid>
                            <Grid item xs={12}>
                                <Typography>
                                    <span style={{ color: 'black', fontSize: 30 }}>
                                        ressentit: {(weather.temp.tempFeel - 273.15).toPrecision(3)}°C
                                    </span>
                                </Typography>
                            </Grid>
                            <Grid item xs={6} justifyContent="center" alignItems="center">
                                <Typography>
                                    <span style={{ color: 'darkblue', fontSize: 20 }}>
                                        Min :{(weather.temp.tempMin - 273.15).toPrecision(3)}°C
                                    </span>
                                </Typography>
                            </Grid>
                            <Grid item xs={6} justifyContent="center" alignItems="center">
                                <Typography>
                                    <span style={{ color: 'darkred', fontSize: 20 }}>
                                        Max : {(weather?.temp.tempMax - 273.15).toPrecision(3)}°C
                                    </span>
                                </Typography>
                            </Grid>
                            <Grid item xs={6}>
                                <WaterTwoToneIcon sx={{ color: 'blue', fontSize: 100, position: 'central' }} />
                                <Typography>Humidity : {weather.humidity} % </Typography>
                            </Grid>
                        </Grid>
                    </CardContent>
                </Card>
            ) : (
                <></>
            )}
        </>
    );
}
export default React.memo(WeatherCard);

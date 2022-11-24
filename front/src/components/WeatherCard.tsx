import * as React from 'react';
import logo from '../assets/WeatherAppLogo.gif';

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { getWeather, WeatherDataInterface } from '../api/weather';
import { CardHeader, Grid, IconButton, Typography } from '@mui/material';
import { grey, yellow } from '@mui/material/colors';
import {
    AcUnitTwoTone,
    AirTwoTone,
    CloudTwoTone,
    StarTwoTone,
    ThunderstormTwoTone,
    WaterTwoTone,
    WbSunnyTwoTone,
} from '@mui/icons-material';
import { cardinalIntFromDegree, cardinalPoint } from '../services/Compass';
import { setFavoris } from '../api/favorite';
import ExploreIcon from '@mui/icons-material/Explore';

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

export interface WeatherCardInterface {
    station: string;
    location: { lon: number; lat: number };
    isUserFav: boolean;
}

function toWeatherInfoInterface(weatherData: WeatherDataInterface): WeatherInfoInterface {
    return {
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
}

interface WeatherCardProps {
    weatherCard: WeatherCardInterface;
    stationList: WeatherCardInterface[];
    handleFav(stationName: string, stationFav: boolean): void;
}
const WeatherCard: React.FC<WeatherCardProps> = (Props) => {
    const { weatherCard, stationList, handleFav } = Props;
    const [weather, setWeather] = React.useState<WeatherInfoInterface | null>(null);
    console.log(weatherCard);

    React.useEffect(() => {
        getWeather(weatherCard).then((r) => {
            const data = r.data as WeatherDataInterface;
            const weatherInfo = toWeatherInfoInterface(data);
            setWeather(weatherInfo);
        });
    }, []);

    React.useEffect(() => {
        const interval = setInterval(() => {
            getWeather(weatherCard).then((r) => {
                const data = r.data as WeatherDataInterface;
                const weatherInfo = toWeatherInfoInterface(data);
                setWeather(weatherInfo);
            });
        }, 60000);
        return () => clearInterval(interval);
    }, []);

    const [isFav, setIsFav] = React.useState(weatherCard.isUserFav);

    function favHandeler(value: boolean) {
        handleFav(weatherCard.station, value);
        setIsFav(value);
        setFavoris(
            stationList.filter((favStation) => favStation.isUserFav).map((favStationName) => favStationName.station)
        ).then();
    }

    return (
        <>
            {weather ? (
                <Card>
                    <CardHeader
                        title={
                            <Typography variant="h3" gutterBottom>
                                {weatherCard.station}
                            </Typography>
                        }
                        action={
                            <IconButton onClick={() => favHandeler(!isFav)}>
                                {isFav ? (
                                    <StarTwoTone sx={{ color: yellow[500], fontSize: 50 }} />
                                ) : (
                                    <StarTwoTone sx={{ color: grey[500], fontSize: 50 }} />
                                )}
                            </IconButton>
                        }
                    />
                    <CardContent>
                        <Grid container spacing={1} justifyContent="center" alignItems="center">
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
                                    <></>
                                )}
                            </Grid>
                            <Grid item xs={12}>
                                <Typography>
                                    <span style={{ color: 'black', fontSize: 30 }}>
                                        ressenti: {(weather.temp.tempFeel - 273.15).toPrecision(3)}°C
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
                                        Max : {(weather.temp.tempMax - 273.15).toPrecision(3)}°C
                                    </span>
                                </Typography>
                            </Grid>
                            <Grid item xs={6} justifyContent="center" alignItems="center">
                                <Typography>
                                    <span style={{ color: 'black', fontSize: 28 }}>
                                        {(weather.wind.speed * 3.6).toPrecision(3)} km/H
                                    </span>
                                </Typography>
                                <Typography>
                                    <ExploreIcon color={'primary'} style={{ marginRight: 4 }} />
                                    <span style={{ color: 'black', fontSize: 28 }}>
                                        {cardinalPoint(cardinalIntFromDegree(weather.wind.angle))}
                                    </span>
                                </Typography>
                                {weather.wind.gust ? (
                                    <Typography>
                                        <span style={{ color: 'black', fontSize: 28 }}>
                                            {(weather.wind.gust * 3.6).toPrecision(3)} km/H
                                        </span>
                                    </Typography>
                                ) : (
                                    <Typography style={{ cursor: 'default' }}>
                                        <span style={{ color: 'black', fontSize: 28, opacity: 0.0 }}>1</span>
                                    </Typography>
                                )}
                            </Grid>
                            <Grid item xs={6} justifyContent="center" alignItems="center">
                                <AirTwoTone sx={{ color: 'grey', fontSize: 100, position: 'central' }} />
                            </Grid>

                            <Grid item xs={6} justifyContent="center" alignItems="center">
                                <Typography>
                                    <span style={{ color: 'black', fontSize: 20 }}>
                                        Humidité : {weather.humidity} %
                                    </span>
                                </Typography>
                            </Grid>
                            <Grid item xs={6} justifyContent="center" alignItems="center">
                                <WaterTwoTone color={'primary'} sx={{ fontSize: 100, position: 'central' }} />
                            </Grid>
                        </Grid>
                    </CardContent>
                </Card>
            ) : (
                <>
                    <img src={logo} alt="loading..." />
                    <div></div>
                </>
            )}
        </>
    );
};
export default React.memo(WeatherCard);

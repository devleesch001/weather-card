import * as React from 'react';

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
//import meteo
import ThunderstormIcon from '@mui/icons-material/Thunderstorm';
import AirIcon from '@mui/icons-material/Air';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import AcUnitIcon from '@mui/icons-material/AcUnit';
import CloudIcon from '@mui/icons-material/Cloud';
import { getWeather, WeatherInterface } from '../api/weather';

function WeatherCard() {
    const [weather, setWeather] = React.useState<WeatherInterface | null>(null); //Hoock

    getWeather('paris').then((r) => {
        const data = r.data as WeatherInterface;
        setWeather(data);
    });

    return (
        <Card>
            <CardContent>
                <WbSunnyIcon></WbSunnyIcon>
            </CardContent>
        </Card>
    );
}
export default React.memo(WeatherCard);

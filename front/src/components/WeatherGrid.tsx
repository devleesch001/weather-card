import * as React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import WeatherCard from './WeatherCard';

interface WeatherGridProps {
    listStation: string[];
}

const WeatherGrid: React.FC<WeatherGridProps> = (Props) => {
    const { listStation } = Props;

    return (
        <Box sx={{ flexGrow: 1 }} margin={2}>
            <Grid container spacing={2} alignItems="center" justifyContent="center">
                {listStation.map((station, index) => (
                    <Grid item md={6} lg={4} key={index}>
                        <WeatherCard stationName={station}></WeatherCard>
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
};

export default React.memo(WeatherGrid);

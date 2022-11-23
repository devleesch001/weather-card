import * as React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import WeatherCard from './WeatherCard';

function WeatherhGrid() {
    return (
        <Box sx={{ flexGrow: 1 }} margin={2}>
            <Grid container spacing={2} alignItems="center" justifyContent="center">
                <Grid item md={6} lg={4}>
                    <WeatherCard></WeatherCard>
                </Grid>
            </Grid>
        </Box>
    );
}

export default React.memo(WeatherhGrid);

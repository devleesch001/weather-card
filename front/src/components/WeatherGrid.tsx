import * as React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import WeatherCard from './WeatherCard';

function WeatherhGrid() {
    return (
        <Box sx={{ flexGrow: 1 }} margin={5}>
            <Grid container spacing={2} alignItems="center" justifyContent="center">
                <Grid item xs={6} md={4}>
                    <WeatherCard></WeatherCard>
                </Grid>
            </Grid>
        </Box>
    );
}

export default React.memo(WeatherhGrid);

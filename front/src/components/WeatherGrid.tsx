import * as React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Unstable_Grid2';
import WeatherCard from './WeatherCard';

function WeatherhGrid() {
    return (
        <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={2}>
                <Grid xs={6} md={8}>
                    <WeatherCard></WeatherCard>
                </Grid>
            </Grid>
        </Box>
    );
}

export default React.memo(WeatherhGrid);

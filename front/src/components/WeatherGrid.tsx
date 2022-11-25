import * as React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { Typography } from '@mui/material';

import WeatherCard, { WeatherCardInterface } from './WeatherCard';

interface WeatherGridProps {
    listStation: WeatherCardInterface[];
    handleFav(stationName: string, stationFav: boolean): void;
}

const WeatherGrid: React.FC<WeatherGridProps> = (Props) => {
    const { listStation, handleFav } = Props;

    return (
        <Box sx={{ flexGrow: 1 }} margin={2}>
            <Grid container spacing={2} alignItems="center" justifyContent="center">
                {listStation.length > 0 ? (
                    listStation.map((station, index, stationList) => (
                        <Grid item md={6} lg={4} key={index}>
                            <WeatherCard weatherCard={station} handleFav={handleFav} stationList={stationList} />
                        </Grid>
                    ))
                ) : (
                    <Box m={5}>
                        <Typography>
                            Aucune carte, vous pouvez chercher une ville dans la barre de recherche pour en ajoutée.
                        </Typography>
                    </Box>
                )}
            </Grid>
        </Box>
    );
};

export default React.memo(WeatherGrid);

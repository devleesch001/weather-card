import * as React from 'react';
import Box from '@mui/material/Box'; // import box
import MenuAppBar from './MenuAppBar';
import WeatherhGrid from './WeatherGrid';
import Login from './Login'; //bouton menu

function Home() {
    return (
        <Box sx={{ flexGrow: 1 }}>
            {/*<MenuAppBar></MenuAppBar>
            <WeatherhGrid></WeatherhGrid>*/}
            <Login></Login>
        </Box>
    );
}

export default React.memo(Home);

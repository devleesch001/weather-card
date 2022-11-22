import * as React from 'react';
import Box from '@mui/material/Box'; // import box
import MenuAppBar from './MenuAppBar';
import WeatherhGrid from './WeatherGrid';
import Login from './Login'; //bouton menu

function Home() {
    const [openLoginModal, setOpenLoginModal] = React.useState(false);
    const handleOpenLoginModal = () => setOpenLoginModal(true);
    const handleCloseLoginModal = () => setOpenLoginModal(false);

    return (
        <Box sx={{ flexGrow: 1 }}>
            <MenuAppBar handleLoginModalOpen={handleOpenLoginModal} />
            <WeatherhGrid />
            <Login open={openLoginModal} handleClose={handleCloseLoginModal} />
        </Box>
    );
}

export default React.memo(Home);

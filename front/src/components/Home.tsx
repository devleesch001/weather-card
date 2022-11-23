import React, { useState } from 'react';
import Box from '@mui/material/Box'; // import box
import MenuAppBar from './MenuAppBar';
import WeatherhGrid from './WeatherGrid';
import Login from './Login';
import Profile from '../components/Profile'; //bouton menu

function Home() {
    const [openLoginModal, setOpenLoginModal] = useState(false);
    const handleOpenLoginModal = () => setOpenLoginModal(true);
    const handleCloseLoginModal = () => setOpenLoginModal(false);

    const [openProfileModal, setOpenProfileModal] = useState(false);
    const handleOpenProfileModal = () => setOpenProfileModal(true);
    const handleCloseProfileModal = () => setOpenProfileModal(false);

    return (
        <Box sx={{ flexGrow: 1 }}>
            <MenuAppBar handleLoginModalOpen={handleOpenLoginModal} handleProfileModalOpen={handleOpenProfileModal} />
            <WeatherhGrid />
            <Login open={openLoginModal} handleClose={handleCloseLoginModal} />
            <Profile open={openProfileModal} handleClose={handleCloseProfileModal} />
        </Box>
    );
}

export default React.memo(Home);

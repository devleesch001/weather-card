import React, { useState } from 'react';

import Box from '@mui/material/Box'; // import box
import MenuAppBar from './MenuAppBar';
import WeatherGrid from './WeatherGrid';
import Login from './Login';
import Profile from '../components/Profile';
import { WeatherCardInterface } from './WeatherCard'; //bouton menu

function Home() {
    const [openLoginModal, setOpenLoginModal] = useState(false);
    const handleOpenLoginModal = () => setOpenLoginModal(true);
    const handleCloseLoginModal = () => setOpenLoginModal(false);

    const [openProfileModal, setOpenProfileModal] = useState(false);
    const handleOpenProfileModal = () => setOpenProfileModal(true);
    const handleCloseProfileModal = () => setOpenProfileModal(false);

    const [listStation, setListStation] = useState<WeatherCardInterface[]>([{ station: 'paris', isUserFav: false }]);
    const addListStationHandeler = (stationName: string) => {
        if (listStation.some((station) => station.station !== stationName)) {
            listStation.push({ station: stationName, isUserFav: false });
            setListStation([...listStation]);
        }
    };

    const addFavHandler = (stationName: string, stationFav: boolean) => {
        const stationIndex = listStation.findIndex((station) => station.station == stationName);
        listStation[stationIndex].isUserFav = stationFav;
    };
    console.log(listStation);
    return (
        <Box sx={{ flexGrow: 1 }}>
            <MenuAppBar
                handleLoginModalOpen={handleOpenLoginModal}
                handleProfileModalOpen={handleOpenProfileModal}
                handleAddListStation={addListStationHandeler}
            />
            <WeatherGrid listStation={listStation} handleFav={addFavHandler} />
            <Login open={openLoginModal} handleClose={handleCloseLoginModal} />
            <Profile open={openProfileModal} handleClose={handleCloseProfileModal} />
        </Box>
    );
}

export default React.memo(Home);

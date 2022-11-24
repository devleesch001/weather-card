import React, { useEffect, useState } from 'react';

import Box from '@mui/material/Box'; // import box
import MenuAppBar from './MenuAppBar';
import WeatherGrid from './WeatherGrid';
import Login from './Login';
import Profile from '../components/Profile';
import { WeatherCardInterface } from './WeatherCard';
import * as AuthService from '../services/AuthentificationService';
import { getFavoris } from '../api/favorite';
import { geoCode, geoCodeToWeatherCardInterface } from '../api/geoCode'; //bouton menu

function Home() {
    const [openLoginModal, setOpenLoginModal] = useState(false);
    const handleOpenLoginModal = () => setOpenLoginModal(true);
    const handleCloseLoginModal = () => setOpenLoginModal(false);

    const [openProfileModal, setOpenProfileModal] = useState(false);
    const handleOpenProfileModal = () => setOpenProfileModal(true);
    const handleCloseProfileModal = () => setOpenProfileModal(false);

    const [listStation, setListStation] = useState<WeatherCardInterface[]>([
        // { station: 'Paris', isUserFav: false, location: { lat: 48.8588897, lon: 2.3200410217200766 } },
    ]);
    const addListStationHandeler = (newStation: WeatherCardInterface) => {
        if (!listStation.some((station) => station.station === newStation.station)) {
            listStation.push(newStation);
            setListStation([...listStation]);
        }
    };

    const addFavHandler = (stationName: string, stationFav: boolean) => {
        const stationIndex = listStation.findIndex((station) => station.station == stationName);
        listStation[stationIndex].isUserFav = stationFav;
    };

    const [connected, setConnected] = useState(false);
    useEffect(() => {
        setConnected(Boolean(AuthService.getAuthToken()));
    }, [AuthService.getAuthToken()]);

    useEffect(() => {
        if (connected) {
            getFavoris().then((r) => {
                const data = r.data as string[];

                data.forEach((element) => {
                    geoCode(element).then((r) => {
                        console.log(r.data[0]);
                        addListStationHandeler(geoCodeToWeatherCardInterface(r.data[0], true));
                    });
                });
            });
        }
    }, [connected]);

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

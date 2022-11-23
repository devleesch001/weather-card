import React, { useState, MouseEvent, useEffect } from 'react';

import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Typography from '@mui/material/Typography';
import { Box, Menu, MenuItem } from '@mui/material';

import AccountCircle from '@mui/icons-material/AccountCircle';
import * as AuthService from '../services/AuthentificationService';
import Button from '@mui/material/Button';

interface MenuAppBarInterface {
    handleLoginModalOpen(): void;
    handleProfileModalOpen(): void;
}

const MenuAppBar: React.FC<MenuAppBarInterface> = (Props) => {
    const { handleLoginModalOpen, handleProfileModalOpen } = Props;

    const menuId = 'primary-search-account-menu';

    const [connected, setConnected] = useState(false);

    useEffect(() => {
        setConnected(Boolean(AuthService.getAuthToken()));
    }, [AuthService.getAuthToken()]);

    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const isMenuOpen = Boolean(anchorEl);

    const handleProfileMenuOpen = (event: MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const renderMenu = (
        <Menu
            anchorEl={anchorEl}
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            id={menuId}
            keepMounted
            transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            open={isMenuOpen}
            onClose={handleMenuClose}
        >
            <MenuItem
                onClick={() => {
                    handleMenuClose();
                    handleProfileModalOpen();
                }}
            >
                Profile
            </MenuItem>
            <MenuItem
                onClick={() => {
                    handleMenuClose();
                    AuthService.logout();
                }}
            >
                Logout
            </MenuItem>
        </Menu>
    );

    return (
        <AppBar position="static">
            <Toolbar>
                <IconButton size="large" edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
                    <MenuIcon />
                </IconButton>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    News
                </Typography>
                <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
                    {connected ? (
                        <IconButton
                            size="large"
                            edge="end"
                            aria-label="account of current user"
                            aria-controls={menuId}
                            aria-haspopup="true"
                            onClick={handleProfileMenuOpen}
                            color="inherit"
                        >
                            <AccountCircle />
                        </IconButton>
                    ) : (
                        <>
                            <Button variant="contained" disableElevation onClick={handleLoginModalOpen}>
                                Sign-In
                            </Button>
                        </>
                    )}
                </Box>
            </Toolbar>
            {renderMenu}
        </AppBar>
    );
};

export default React.memo(MenuAppBar);

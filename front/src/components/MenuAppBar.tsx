import React, { useState, MouseEvent, useEffect } from 'react';
import * as AuthService from '../services/AuthentificationService';

import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { alpha, Box, InputBase, Menu, MenuItem, styled } from '@mui/material';
import Button from '@mui/material/Button';

import AccountCircle from '@mui/icons-material/AccountCircle';
import SearchIcon from '@mui/icons-material/Search';
import WbSunnyIcon from '@mui/icons-material/WbSunny';

const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(3),
        width: 'auto',
    },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
            width: '20ch',
        },
    },
}));

interface MenuAppBarProps {
    handleLoginModalOpen(): void;
    handleProfileModalOpen(): void;
    handleAddListStation(station: string): void;
}

const MenuAppBar: React.FC<MenuAppBarProps> = (Props) => {
    const { handleLoginModalOpen, handleProfileModalOpen, handleAddListStation } = Props;

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
                    <WbSunnyIcon />
                </IconButton>
                <Typography variant="h6" noWrap component="div" sx={{ display: { xs: 'none', sm: 'block' } }}>
                    METEO
                </Typography>
                <Search>
                    <SearchIconWrapper>
                        <SearchIcon />
                    </SearchIconWrapper>
                    <StyledInputBase
                        placeholder="Search…"
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                                const target = e.target as HTMLInputElement;
                                handleAddListStation(target.value);
                                target.value = '';
                            }
                        }}
                        inputProps={{ 'aria-label': 'search' }}
                    />
                </Search>
                <Box sx={{ flexGrow: 1 }} />
                <Box sx={{ display: { xs: 'flex', md: 'flex' } }}>
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

import React from 'react';
import jwtDecode from 'jwt-decode';

import { getAuthToken, UserInformationInterface } from '../services/AuthentificationService';

import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';

export interface ProfileProps {
    open: boolean;
    handleClose(): void;
}

const Profile: React.FC<ProfileProps> = (Props) => {
    const { open, handleClose } = Props;

    const token = getAuthToken() ?? '';

    if (token == '') {
        handleClose();
    }

    try {
        const user = jwtDecode<UserInformationInterface>(token);
        return (
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="profile-modal-title"
                aria-describedby="profile-modal-description"
            >
                <Box
                    sx={{
                        position: 'absolute' as const,
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: { xs: 300, md: 400 },
                    }}
                >
                    <Paper>
                        <Box alignItems={'center'} flexDirection={'column'} padding={5}>
                            <Typography component="h1" variant="h5">
                                Profile
                            </Typography>
                            <Box sx={{ mt: 1 }}>
                                <TextField
                                    disabled
                                    margin="normal"
                                    required
                                    fullWidth
                                    type="email"
                                    id="email"
                                    label="Email Address"
                                    name="email"
                                    autoComplete="email"
                                    autoFocus
                                    defaultValue={user?.email}
                                />
                                <TextField
                                    disabled
                                    margin="normal"
                                    required
                                    fullWidth
                                    name="username"
                                    label="username"
                                    type="text"
                                    id="username"
                                    autoComplete="current-username"
                                    defaultValue={user?.username}
                                />
                            </Box>
                        </Box>
                    </Paper>
                </Box>
            </Modal>
        );
    } catch (e) {
        return <></>;
    }
};

export default React.memo(Profile);

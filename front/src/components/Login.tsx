import * as React from 'react';
import * as AuthService from '../services/AuthentificationService';

import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Button from '@mui/material/Button';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';

import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Modal from '@mui/material/Modal';

import Typography from '@mui/material/Typography';
import Alert from '@mui/material/Alert';

import LoginIcon from '@mui/icons-material/Login';
import RegisterIcon from '@mui/icons-material/ExitToApp';
import { getAuthToken } from '../services/AuthentificationService';

const style = {
    position: 'absolute' as const,
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
};

interface LoginProps {
    open: boolean;

    handleClose(): void;
}

const LoginForm: React.FC<{ handleClose(): void }> = (Props) => {
    const { handleClose } = Props;
    const closeHandler = () => {
        setTimeout(handleClose, 1000);
    };

    const [authStatus, setAuthStatus] = React.useState<'none' | 'error' | 'success'>('none');

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);

        const email = data.get('email')?.toString();
        const password = data.get('password')?.toString();

        if (!email || !password) return;

        AuthService.login(email, password)
            .then((r) => {
                const token = r.data.token;
                console.log(token);
                AuthService.setAuthToken(token);
                setAuthStatus('success');
                closeHandler();
            })
            .catch(() => {
                console.log('error');
                setAuthStatus('error');
            });
    };

    const formName = 'Sign In';

    return (
        <Box alignItems={'center'} flexDirection={'column'} padding={5}>
            {authStatus === 'success' ? (
                <Alert severity="success">Connected</Alert>
            ) : authStatus === 'error' ? (
                <Alert severity="error">Failed</Alert>
            ) : (
                <></>
            )}

            <Typography component="h1" variant="h5">
                {formName}
            </Typography>
            <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    type="email"
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    autoFocus
                />
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="current-password"
                />
                <FormControlLabel control={<Checkbox value="remember" color="primary" />} label="Remember me" />
                <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
                    {formName}
                </Button>
            </Box>
        </Box>
    );
};

const RegisterForm: React.FC<{ handleClose(): void }> = (Props) => {
    const { handleClose } = Props;
    const closeHandler = () => {
        setTimeout(handleClose, 1000);
    };

    const [authStatus, setAuthStatus] = React.useState<'none' | 'error' | 'success'>('none');

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);

        const username = data.get('username')?.toString();
        const email = data.get('email')?.toString();
        const password = data.get('password')?.toString();

        if (!username || !email || !password) return;

        AuthService.register(username, email, password)
            .then((r) => {
                const token = r.data.token;
                AuthService.setAuthToken(token);
                setAuthStatus('success');
                closeHandler();
            })
            .catch(() => {
                setAuthStatus('error');
            });
    };

    const formName = 'Sign Up';

    return (
        <Box alignItems={'center'} flexDirection={'column'} padding={5}>
            {authStatus === 'success' ? (
                <Alert severity="success">Connected</Alert>
            ) : authStatus === 'error' ? (
                <Alert severity="error">Failed</Alert>
            ) : (
                <></>
            )}
            <Typography component="h1" variant="h5">
                {formName}
            </Typography>
            <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    type="email"
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    autoFocus
                />
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    type="text"
                    id="email"
                    label="Username"
                    name="username"
                    autoComplete="username"
                    autoFocus
                />
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="current-password"
                />
                <FormControlLabel control={<Checkbox value="remember" color="primary" />} label="Remember me" />
                <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
                    {formName}
                </Button>
            </Box>
        </Box>
    );
};

const Login: React.FC<LoginProps> = (Props) => {
    const { open, handleClose } = Props;
    const [value, setValue] = React.useState(0);

    /* close page if already connected */
    if (AuthService.getAuthToken()) {
        handleClose();
    }

    return (
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="login-modal-title"
            aria-describedby="login-modal-description"
        >
            <Box sx={style}>
                <Paper>
                    <Paper elevation={3}>
                        <BottomNavigation
                            showLabels
                            value={value}
                            onChange={(event, newValue) => {
                                setValue(newValue);
                            }}
                        >
                            <BottomNavigationAction label="Login" icon={<LoginIcon />} />
                            <BottomNavigationAction label="Register" icon={<RegisterIcon />} />
                        </BottomNavigation>
                    </Paper>
                    {value === 0 ? <LoginForm handleClose={handleClose} /> : <RegisterForm handleClose={handleClose} />}
                </Paper>
            </Box>
        </Modal>
    );
};
export default React.memo(Login);

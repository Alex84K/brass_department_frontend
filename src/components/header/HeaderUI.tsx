import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import icon_sm from "/assets/logo_sm.svg"
import styles from "./Header.module.css"
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { logout, selectUser, selectUserStatus } from '../../features/users/userSlice';
import { User, UserState } from '../../features/users/type';
import { getAvatar, selectImage } from '../../features/images/imageSlice';

const pages = ['Home', 'Pricing', 'Blog'];


const HeaderUI = () => {
    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    const user: UserState = useAppSelector(state => state.user)
    const avatar = useAppSelector(selectImage)
    const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
    const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);

    const out = () => {
        dispatch(logout())
        navigate('/')
    }

    const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    React.useEffect(() => {
        dispatch(getAvatar(String(user.user?.image)))
    }, [user])

    return (
        <AppBar position="static">
            <Container maxWidth="xl" className={`${styles.bg_dark}`}>
                <Toolbar disableGutters>
                    <Typography
                        variant="h6"
                        noWrap
                        component="a"
                        href="#app-bar-with-responsive-menu"
                        sx={{
                            mr: 2,
                            display: { xs: 'none', md: 'flex' },
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.3rem',
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                    >
                        <img src={icon_sm} onClick={() => navigate('/')} />
                    </Typography>

                    <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleOpenNavMenu}
                            color="inherit"
                        >
                            <MenuIcon />
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorElNav}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'left',
                            }}
                            open={Boolean(anchorElNav)}
                            onClose={handleCloseNavMenu}
                            sx={{
                                display: { xs: 'block', md: 'none' },
                            }}
                        >
                            {pages.map((page) => (
                                <MenuItem key={page} onClick={handleCloseNavMenu}>
                                    <Typography textAlign="center">{page}</Typography>
                                </MenuItem>
                            ))}
                        </Menu>
                    </Box>
                    <Typography
                        variant="h5"
                        noWrap
                        component="a"
                        href="#app-bar-with-responsive-menu"
                        sx={{
                            mr: 2,
                            display: { xs: 'flex', md: 'none' },
                            flexGrow: 1,
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.3rem',
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                    >
                    </Typography>
                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                        <Button
                            onClick={() => navigate('/')}
                            sx={{ my: 2, color: 'white', display: 'block' }}
                        >
                            Home
                        </Button>
                        <Button
                            onClick={() => navigate('/about')}
                            sx={{ my: 2, color: 'white', display: 'block' }}
                        >
                            About Us
                        </Button>
                        {user.status === "success" ? (<Button
                            onClick={() => navigate('/cabinet')}
                            sx={{ my: 2, color: 'white', display: 'block' }}
                        >
                            Cabinet
                        </Button>) : (<p></p>)}
                        {user.status === "success" && user.user?.roles?.includes("ADMINISTRATOR") ? (<Button
                            onClick={() => navigate('/admin')}
                            sx={{ my: 2, color: 'white', display: 'block' }}
                        >
                            Admin panel
                        </Button>) : (<p></p>)}
                    <Box sx={{ flexGrow: 0 }}></Box>
                        
                    </Box>
                    {user.status === "success" ? (<Typography className={`pe-3 ${styles.d_none_mobi}`} onClick={out}>LogOut</Typography>) : (<Typography className={`pe-3 ${styles.d_none_mobi}`} onClick={() => navigate('/login')}>LogIn</Typography>)}
                    <Box sx={{ flexGrow: 0 }}>

                        <Tooltip title="Open settings">
                            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                <Avatar alt="Remy Sharp" src={`data:image/jpeg;base64,${avatar?.bytes}`} />
                            </IconButton>
                        </Tooltip>
                        <Menu
                            sx={{ mt: '45px' }}
                            id="menu-appbar"
                            anchorEl={anchorElUser}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            open={Boolean(anchorElUser)}
                            onClose={handleCloseUserMenu}
                        >
                            <MenuItem onClick={handleCloseUserMenu}>
                                <ul>
                                    <li><Typography textAlign="center">Profile</Typography></li>
                                    <li><Typography textAlign="center">Logout</Typography></li>
                                    <li onClick={out}><Typography textAlign="center">Admin</Typography></li>
                                    <li onClick={() => navigate('/login')}><Typography textAlign="center">Login</Typography></li>
                                    <li onClick={() => navigate('/Chat')}><Typography textAlign="center">Chat</Typography></li>
                                </ul>
                            </MenuItem>
                        </Menu>
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
}

export default HeaderUI
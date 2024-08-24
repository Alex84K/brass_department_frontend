
import AppBar from '@mui/material/AppBar';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import HelpIcon from '@mui/icons-material/Help';
import IconButton from '@mui/material/IconButton';
import Link from '@mui/material/Link';
import MenuIcon from '@mui/icons-material/Menu';
import NotificationsIcon from '@mui/icons-material/Notifications';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import Toolbar from '@mui/material/Toolbar';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import { useAppDispatch } from '../../app/hooks';
import { allUsers } from '../../features/users/userSlice';
import { allExams } from '../../features/exams/examsSlice';
import { allMaterials } from '../../features/materials/materialSlice';
import { Fragment, useContext, useState } from 'react';
import { AdminContext } from './utils/context';

const lightColor = 'rgba(255, 255, 255, 0.7)';

interface HeaderProps {
    onDrawerToggle: () => void;
}

export default function HeaderAdmin(props: HeaderProps) {
    const { onDrawerToggle } = props;
    const dispatch = useAppDispatch()
    const [txtHerrit, setTxtHerrit] = useState<number | undefined>(0)

    const { usersTable, examsTable, materialsTable, changeUsersTable, changeExamsTable, changeMaterialsTable } = useContext(AdminContext);

    let toggleUsersTable = () => {
        dispatch(allUsers())
        setTxtHerrit(0)
        if (usersTable && changeUsersTable !== undefined && changeExamsTable !== undefined && changeMaterialsTable !== undefined) {
            changeUsersTable(false)
            changeExamsTable(true)
            changeMaterialsTable(true)
        }
    }

    let toggleExamsTable = () => {
        setTxtHerrit(1)
        if (examsTable && changeUsersTable !== undefined && changeExamsTable !== undefined && changeMaterialsTable !== undefined) {
            changeUsersTable(true)
            dispatch(allExams())
            changeExamsTable(false)
            changeMaterialsTable(true)
        }
    }

    let toggleMaterialsTable = () => {
        setTxtHerrit(2)
        if (materialsTable && changeUsersTable !== undefined && changeExamsTable !== undefined && changeMaterialsTable !== undefined) {
            changeUsersTable(true)
            dispatch(allMaterials(50000))
            changeExamsTable(true)
            changeMaterialsTable(false)
        } 
    }

    return (
        <Fragment>

            <AppBar color="primary" position="sticky" elevation={0}>
                <Toolbar>
                    <Grid container spacing={1} alignItems="center">
                        <Grid sx={{ display: { sm: 'none', xs: 'block' } }} item>
                            <IconButton
                                color="inherit"
                                aria-label="open drawer"
                                onClick={onDrawerToggle}
                                edge="start"
                            >
                                <MenuIcon />
                            </IconButton>
                        </Grid>
                        <Grid item xs />
                        <Grid item>
                            <Typography color="inherit" variant="h5" component="h1">
                                Hello Admin!!!
                            </Typography>
                        </Grid>
                        <Grid item>
                            <Tooltip title="Alerts • No alerts">
                                <IconButton color="inherit">
                                    <NotificationsIcon />
                                </IconButton>
                            </Tooltip>
                        </Grid>
                        <Grid item>
                            <IconButton color="inherit" sx={{ p: 0.5 }}>
                                <Avatar src="/static/images/avatar/1.jpg" alt="My Avatar" />
                            </IconButton>
                        </Grid>
                    </Grid>
                </Toolbar>
            </AppBar>

            <AppBar component="div" position="static" elevation={0} sx={{ zIndex: 0 }}>
                <Tabs value={txtHerrit} textColor="inherit">
                    <Tab label="Users" onClick={toggleUsersTable} />
                    <Tab label="Exams"  onClick={toggleExamsTable} />
                    <Tab label="Materials" onClick={toggleMaterialsTable} />
                </Tabs>
            </AppBar>
        </Fragment>
    );
}
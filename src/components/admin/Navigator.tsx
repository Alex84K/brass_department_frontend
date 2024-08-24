
import Divider from '@mui/material/Divider';
import Drawer, { DrawerProps } from '@mui/material/Drawer';
import List from '@mui/material/List';
import Box from '@mui/material/Box';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import HomeIcon from '@mui/icons-material/Home';
import PeopleIcon from '@mui/icons-material/People';
import DnsRoundedIcon from '@mui/icons-material/DnsRounded';
import PermMediaOutlinedIcon from '@mui/icons-material/PhotoSizeSelectActual';
import PublicIcon from '@mui/icons-material/Public';
import SettingsEthernetIcon from '@mui/icons-material/SettingsEthernet';
import SettingsInputComponentIcon from '@mui/icons-material/SettingsInputComponent';
import TimerIcon from '@mui/icons-material/Timer';
import SettingsIcon from '@mui/icons-material/Settings';
import PhonelinkSetupIcon from '@mui/icons-material/PhonelinkSetup';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../app/hooks';
import { allUsers } from '../../features/users/userSlice';
import { allExams } from '../../features/exams/examsSlice';
import { allMaterials } from '../../features/materials/materialSlice';
import { useContext, useState } from 'react';
import { AdminContext } from './utils/context';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import AssessmentIcon from '@mui/icons-material/Assessment';
import DescriptionIcon from '@mui/icons-material/Description';

const categories = [
    {
        id: 'Build',
        children: [
            {
                id: 'Authentication',
                icon: <PeopleIcon />,
                active: true,
            },
            { id: 'Database', icon: <DnsRoundedIcon /> },
            { id: 'Storage', icon: <PermMediaOutlinedIcon /> },
            { id: 'Hosting', icon: <PublicIcon /> },
            { id: 'Functions', icon: <SettingsEthernetIcon /> },
            {
                id: 'Machine learning',
                icon: <SettingsInputComponentIcon />,
            },
        ],
    },
    {
        id: 'Quality',
        children: [
            { id: 'Analytics', icon: <SettingsIcon /> },
            { id: 'Performance', icon: <TimerIcon /> },
            { id: 'Test Lab', icon: <PhonelinkSetupIcon /> },
        ],
    },
];

const item = {
    py: '2px',
    px: 3,
    color: 'rgba(255, 255, 255, 0.7)',
    '&:hover, &:focus': {
        bgcolor: 'rgba(255, 255, 255, 0.08)',
    },
};

const itemCategory = {
    boxShadow: '0 -1px 0 rgb(255,255,255,0.1) inset',
    py: 1.5,
    px: 3,
};

export default function Navigator(props: DrawerProps) {
    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    const { ...other } = props;

    const { usersTable, examsTable, materialsTable, changeUsersTable, changeExamsTable, changeMaterialsTable } = useContext(AdminContext);
    const [selectedUser, setSelectedUser] = useState(false)
    const [selectedExam, setSelectedExam] = useState(false)
    const [selectedMaterial, setSelectedMaterial] = useState(false)

    let toggleUsersTable = () => {
        setSelectedUser(true)
        setSelectedExam(false)
        setSelectedMaterial(false)
        dispatch(allUsers())
        if (usersTable && changeUsersTable !== undefined && changeExamsTable !== undefined && changeMaterialsTable !== undefined) {
            changeUsersTable(false)
            changeExamsTable(true)
            changeMaterialsTable(true)
        }
    }

    let toggleExamsTable = () => {
        setSelectedUser(false)
        setSelectedExam(true)
        setSelectedMaterial(false)
        if (examsTable && changeUsersTable !== undefined && changeExamsTable !== undefined && changeMaterialsTable !== undefined) {
            changeUsersTable(true)
            dispatch(allExams())
            changeExamsTable(false)
            changeMaterialsTable(true)
        }
    }

    let toggleMaterialsTable = () => {
        setSelectedUser(false)
        setSelectedExam(false)
        setSelectedMaterial(true)
        if (materialsTable && changeUsersTable !== undefined && changeExamsTable !== undefined && changeMaterialsTable !== undefined) {
            changeUsersTable(true)
            dispatch(allMaterials(50000))
            changeExamsTable(true)
            changeMaterialsTable(false)
        } 
    }

    return (
        <Drawer variant="permanent" {...other}>
            <List disablePadding>
                <ListItem sx={{ ...item, ...itemCategory, fontSize: 22, color: '#fff' }}>
                    Paperbase
                </ListItem>
                <ListItem sx={{ ...item, ...itemCategory }} onClick={() => { navigate('/') }}>
                    <ListItemIcon>
                        <HomeIcon />
                    </ListItemIcon>
                    <ListItemText>Home</ListItemText>
                </ListItem>

                <Box sx={{ bgcolor: '#101F33' }}>
                    <ListItem disablePadding>
                        <ListItemButton selected={selectedUser} sx={item} onClick={toggleUsersTable }>
                            <ListItemIcon><PeopleAltIcon /> </ListItemIcon>
                            <ListItemText>Users</ListItemText>
                        </ListItemButton>
                    </ListItem>
                    <ListItem disablePadding>
                        <ListItemButton selected={selectedExam} sx={item} onClick={toggleExamsTable}>
                            <ListItemIcon><AssessmentIcon /> </ListItemIcon>
                            <ListItemText>Exams</ListItemText>
                        </ListItemButton>
                    </ListItem>
                    <ListItem disablePadding>
                        <ListItemButton selected={selectedMaterial} sx={item} onClick={toggleMaterialsTable}>
                            <ListItemIcon><DescriptionIcon /> </ListItemIcon>
                            <ListItemText>Materials</ListItemText>
                        </ListItemButton>
                    </ListItem>

                    <Divider sx={{ mt: 2 }} />
                </Box>

            </List>
        </Drawer>
    );
}
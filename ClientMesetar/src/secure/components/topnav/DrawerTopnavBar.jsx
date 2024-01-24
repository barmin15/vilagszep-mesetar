//imports
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import SearchIcon from '@mui/icons-material/Search'

import logo from "./logo.png"

//width of the sidebar on ipad and mobile devices
const drawerWidth = 240;

export default function DrawerTopnavBar({
    //props from Topnav.jsx component
    pages,
    onLogout,
    SearchIconWrapper,
    Search,
    StyledInputBase
}) {
    const navigate = useNavigate();
    const [mobileOpen, setMobileOpen] = useState(false);
    const [search, setSearch] = useState("");

    const handleDrawerToggle = () => {
        setMobileOpen((prevState) => !prevState);
    };

    //drawer elements
    const drawer = (
        <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
            <Typography variant="h6" sx={{ my: 2 }}>
                MESETÁR
            </Typography>
            <Divider />
            <List>
                <ListItem disablePadding>
                    <ListItemButton sx={{ textAlign: 'center' }} href="/app/mesetar">
                        <ListItemText primary="otthon" />
                    </ListItemButton>
                </ListItem>
                {pages.map((item) => (
                    <ListItem key={item[0]} disablePadding>
                        <ListItemButton sx={{ textAlign: 'center' }} href={item[1]}>
                            <ListItemText primary={item[0]} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
        </Box>
    );

    //handling the navigation after search is active
    function handleSearch(e) {
        //checking if search is not made of only whitespaces
        const isWhitespaceString = str => !str.replace(/\s/g, '').length;
        if (isWhitespaceString(search)) navigate("/app/mesek/all")
        else navigate("/app/mesek/" + search);
        setSearch("");
    }


    //inserting elements into the virtual DOM
    return <Box position="static" sx={{
        height: "65px",
        borderRadius: "5px",
        display: 'flex'
    }}>
        <CssBaseline />
        <AppBar component="nav">
            <Toolbar>
                <IconButton
                    color="inherit"
                    aria-label="open drawer"
                    edge="start"
                    onClick={handleDrawerToggle}
                    sx={{ mr: 2, display: { md: "none", sm: 'block', xs: 'block' } }}
                >
                    <MenuIcon />
                </IconButton>
                <IconButton
                    size="large"
                    edge="start"
                    color="inherit"
                    aria-label="open drawer"
                    sx={{ mr: 2, display: { xs: 'none', sm: 'none', md: 'contents' } }}
                >
                    <img src={logo} alt="Logo" style={{ height: 55 }} />

                    <Typography href="/app/mesetar" variant="h6" noWrap component="div" onClick={(e) => navigate("/app/mesetar")} sx={{
                        cursor: "pointer",
                        mr: 2,
                        zIndex: 2,
                        fontFamily: 'monospace',
                        fontWeight: 700,
                        letterSpacing: '.3rem',
                        color: 'inherit',
                        textDecoration: 'none'
                    }}>
                        MESETÁR
                    </Typography>
                </IconButton>

                <Box sx={{
                    flexGrow: 1,
                    display: {
                        xs: 'none',
                        md: 'flex'
                    }
                }}>
                    {pages.map((page, index) => page === "kijelentkezés" ? <Button key={index} href={page[1]} onClick={onLogout} sx={{
                        my: 2,
                        color: 'white',
                        display: { xs: 'none', sm: 'block' }
                    }}>
                        {page[0]}
                    </Button>
                        :
                        <Button key={index} href={page[1]} sx={{
                            my: 1,
                            color: 'white',
                            display: { xs: 'none', sm: 'block' },
                        }}>
                            {page[0]}
                        </Button>)}
                </Box>
                <Search>
                    <Button onClick={handleSearch} sx={{
                        height: '100%',
                        position: 'absolute',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        zIndex: 2
                    }}>
                        <SearchIconWrapper>
                            <SearchIcon />
                        </SearchIconWrapper>
                    </Button>
                    <StyledInputBase value={search} onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                            handleSearch(e);
                            e.preventDefault();
                        }
                    }} onChange={(e) => setSearch(e.target.value)} placeholder="Keresendő szó vagy kifejezés" inputProps={{
                        'aria-label': 'search'
                    }} />
                </Search>
            </Toolbar>
        </AppBar>
        <nav>
            <Drawer
                variant="temporary"
                open={mobileOpen}
                onClose={handleDrawerToggle}
                ModalProps={{
                    keepMounted: true, // Better open performance on mobile deviced
                }}
                sx={{
                    display: { xs: 'block', sm: 'block', md: 'none' },
                    '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                }}
            >
                {drawer}
            </Drawer>
        </nav>
    </Box >

}


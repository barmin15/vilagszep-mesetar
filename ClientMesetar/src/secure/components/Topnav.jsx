import * as React from 'react';
import { Outlet } from "react-router-dom";
import { styled, alpha } from '@mui/material/styles';
import { deleteAuthToken, deleteUserLogin } from "../../logic/localStorage";
import InputBase from '@mui/material/InputBase';
import DrawerTopnavBar from './topnav/DrawerTopnavBar';
import { getFavouritesPage, getLoginPage, getSearchedStoriesPage, getUsersForAdminPage } from '../../api/endpoints';


//searching position
const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginRight: theme.spacing(1),
    width: 'auto',
  },
}));

//search icon
const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

//search style
const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  width: '100%',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    [theme.breakpoints.up('sm')]: {
      //this is minimum width
      width: '12ch',
      '&:focus': {
        //this is max width
        width: '35ch',
      },
    },
  },
}));

export default function Topnav() {
  //if you want to add more pages to navigate to from the TopnavBa:
  //simply add another array, 0th element the text, and 1st is the page to navigate to
  const pages = [["mesék", getSearchedStoriesPage("all")],['kedvencek', getFavouritesPage()], ["admin", getUsersForAdminPage()], ['kijelentkezés', getLoginPage()]];

  //just security measure
  //when logging out, delete all app related elements from the sessionStorage
  function onLogout() {
    deleteAuthToken();
    deleteUserLogin();
  }

  return (
    <>
    <DrawerTopnavBar pages={pages} onLogout={onLogout} Search={Search} SearchIconWrapper={SearchIconWrapper} StyledInputBase={StyledInputBase}/>
    {/*this is important to display elements under the topnav bar */}
    <Outlet />
    </>
    );
  }
import React from "react";
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
//import reportWebVitals from "./config/reportWebVitals";

//color theme for material ui
import { ThemeProvider, createTheme } from '@mui/material/styles';

//pages
import Login from "./unsecure/pages/Login";
import Library from "./secure/pages/Libarary";
import FavouriteStories from "./secure/pages/FavouriteStories"
import Topnav from "./secure/components/Topnav";
import Users from "./secure/pages/admin/Users";
import Stories from "./secure/pages/admin/Stories";
import Story from "./secure/pages/Story";
import AllStories from "./secure/pages/AllStories";

//router to display pages on different endpoints
//if you want to add a new page, where the topnav bar is visible on the top, add it as a child of the topnavBar, and create the endpoint for it, starting with '/app'
//all the routes that have admin in the path, can only be opened by users with ADMIN role
const Router = createBrowserRouter([
  {
    path: "/",
    element: <Login />
  },
  {
    path: "/login",
    element: <Login />
  },
  {
    path: "/app",
    element: <Topnav />,
    children: [
      {
        path: "/app/mesetar",
        element: <Library />
      },
      {
        path: "/app/mesek/:search",
        element: <AllStories />
      },
      {
        path: "/app/profil",
        element: <FavouriteStories />
      },
      {
        path: "/app/mese/:publicId",
        element: <Story />
      },
      {
        path: "/app/admin/felhasznalok",
        element: <Users />
      },
      {
        path: "/app/admin/mesek",
        element: <Stories />
      },
      {
        path: "/app/mesek/:filter/:search",
        element: <AllStories />
      }
    ]
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));

//in the theme provider you can change the color style of the MUI elements, that dont have color assigned through the 'sx' tag
root.render(
  <React.StrictMode>
    <ThemeProvider theme={createTheme({
      palette: {
        primary: {
          main: '#4B79A1',
        },
        secondary: {
          main: '#EEF5FF',
        },
        info: {
          main: "#222831"
        },
        success: {
          main: "#E1F0DA"
        },
        error: {
          main: "#FFCCCC"
        }
      },
    })}>
      <RouterProvider router={Router} />
    </ThemeProvider>
  </React.StrictMode>
);

//this is needed while developement
//reportWebVitals();
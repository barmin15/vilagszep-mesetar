//imports
import React from "react";
import { NewUserForm } from './userForm/NewUserForm';
import { useState } from "react";
import { isValidRegister } from "../../../../logic/registerLogic";
import { request } from "../../../../api/fetch";
import { useNavigate } from "react-router-dom";

//MUI import
import Backdrop from '@mui/material/Backdrop';

export function AddNewUser({
    //props from the parent component
    users,
    newUser,
    setErrorCreateText,
    setIsnotCreated
}) {
    const navigate = useNavigate();
    //states fro storing data
    const [role, setRole] = useState("USER");
    const [login, setLogin] = useState("");
    const [password, setPassword] = useState(null);


    //function to handle the event, when a ADMIN type client creates a new user
    function onAddNewUser(e) {
        e.preventDefault();
        const validRegister = isValidRegister(users, login, password);

        if (validRegister[0]) {
            request("POST", "/api/auth/admin/register", { login, password, role })
                .then(res => {
                    setLogin(null);
                    setPassword(null);
                    setRole("USER");
                    //if succesfull, the page will reload, showing the newly created user 
                    window.location.reload(false)
                })
                .catch(err => navigate("/login"));
        } else {
            //if any data was not properly set, an error window will appear
            setErrorCreateText(validRegister[1])
            setIsnotCreated(true);
        }
    }

    //rendering elements to the vertual DOM
    return <Backdrop sx={{ color: '#fff', zIndex: theme => theme.zIndex.drawer + 1 }} open={newUser}>
        <NewUserForm setLogin={setLogin} setPassword={setPassword} role={role} setRole={setRole} onAddNewUser={onAddNewUser} />
    </Backdrop>;
}

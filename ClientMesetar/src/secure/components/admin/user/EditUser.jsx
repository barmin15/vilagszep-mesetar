import React from "react";
import { useState, useEffect } from "react";
import { getRequest, request } from "../../../../api/fetch";
import { useNavigate } from "react-router-dom";
import { isValidEditUser } from "../../../../logic/registerLogic";
import { Button, FormControl, Stack } from "@mui/material";
import AlertDialog from "../../../../unsecure/components/AlertDialog";
import {onlyWhitespaces} from "../../../../logic/checkLogic";

import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';


export default function EditUser({ publicId, isEditUser, users, setErrorCreateText, setIsnotCreated }) {
    const navigate = useNavigate();
    const [login, setLogin] = useState(null);
    const [password, setPassword] = useState(null);
    const [role, setRole] = useState(null);
    const [previousUser, setPreviousUser] = useState(null);
    const [isAlertOpen, setIsAlertOpen] = useState(false);

    useEffect(() => {
        if (publicId) {
            getRequest(`/api/user/admin/${publicId}`)
                .then(res => {
                    setPreviousUser(res.data);
                    setRole(res.data.role);
                    setLogin(res.data.login);
                })
                .catch(err => navigate("/login"));
        }
    }, [navigate, publicId])

    function onEditUser(e) {
        e.preventDefault();
        setIsAlertOpen(true);
    }

    function EditUser() {
        if(onlyWhitespaces(password)) setPassword(null);

        const validEdit = isValidEditUser(users, login, password, previousUser.login);

        if(validEdit[0]){
            request("POST", `/api/user/admin/${publicId}`, { login, password, role })
                .then(res => { window.location.reload(false) })
                .catch(err => navigate("/login"))
        } else {
            setErrorCreateText(validEdit[1])
            setIsnotCreated(true);
        }
    }

    return <Backdrop sx={{ color: '#fff', zIndex: theme => theme.zIndex.drawer + 1 }} open={isEditUser}>
        <Box
            component="form"
            sx={{ '& > :not(style)': { m: 1, width: '35ch' } }}
            noValidate
            autoComplete="off">
            <FormControl>
                <Stack spacing={2}>
                    <TextField
                        value={login ? login : ""}
                        onChange={e => setLogin(e.target.value)}
                        required
                        variant="filled"
                        sx={{ backgroundColor: "#F8EDE3" }}>
                    </TextField>
                    <TextField
                        onChange={e => setPassword(e.target.value)}
                        variant="filled" required
                        label="Jelszó"
                        sx={{ backgroundColor: "#F8EDE3" }}
                    />
                    <Select
                        labelId="demo-simple-select-filled-label"
                        id="demo-simple-select-filled"
                        value={role && role === "USER" ? "USER" : "ADMIN"}
                        onChange={(e) => setRole(e.target.value)}
                        sx={{ backgroundColor: "#F8EDE3" }}>
                        <MenuItem
                            value={"USER"}
                            variant="filled"
                            sx={{ backgroundColor: "#F8EDE3" }}
                        >USER</MenuItem>
                        <MenuItem
                            value={"ADMIN"}
                            sx={{ backgroundColor: "#F8EDE3" }}
                        >ADMIN</MenuItem>
                    </Select>
                </Stack>
                <Button
                    sx={{ top: 11 }}
                    color="primary"
                    size="large"
                    variant="contained"
                    onClick={onEditUser}
                > MENTÉS</Button>
                <Button sx={{ top: 22 }}
                    color="primary"
                    size="large"
                    variant="contained"
                    onClick={(e) => window.location.reload(false)}
                > MÉGSE</Button>
            </FormControl>
        </Box>
        <AlertDialog
            titleText={<p>Biztos benne, hogy megváltoztatja <span style={{ textDecoration: "underline", fontWeight: "bold" }}>{previousUser?.login}</span> felhasználót?</p>}
            secondaryText={<>Az új felhasználónév
                <span style={{ textDecoration: "underline", fontWeight: "bold" }}> {login}</span> a jelszó 
                {password === null ?  " a régi marad " : onlyWhitespaces(password) ? "a régi marad " : 
               <> <span style={{ textDecoration: "underline", fontWeight: "bold" }}>{password}</span> </>}
                a role pedig <span style={{ textDecoration: "underline", fontWeight: "bold" }}>{role}</span> lesz</>}
            handleClose={(e) => setIsAlertOpen(false)}
            handleIsOkay={EditUser}
            open={isAlertOpen} />
    </Backdrop>
}
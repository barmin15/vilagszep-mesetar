//imports
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UsersTable } from '../../components/admin/UsersTable';
import { AddNewUser } from '../../components/admin/user/AddNewUser';
import { request } from '../../../api/fetch';
import { getRequest } from "../../../api/fetch";
import Loading from "../../../unsecure/components/Loading";
import ErrorSnackBar from "../../../unsecure/components/ErrorSnackBar";
import EditUser from '../../components/admin/user/EditUser';
import AlertDialog from '../../../unsecure/components/AlertDialog';

//MUI imports
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import { Button } from '@mui/material';
import { getLoginPage, getStoriesForAdmin } from "../../../api/endpoints";

export default function Users() {
    const navigate = useNavigate();
    //quite a lot of states to store data
    const [users, setUsers] = useState(null);
    const [isNotAdmin, setIsNotAdmin] = useState(false);
    const [newUser, setNewUser] = useState(false);
    const [isNotCreated, setIsnotCreated] = useState(false);
    const [errorCreateText, setErrorCreateText] = useState(null);
    const [isEditUser, setIsEditUser] = useState(false);
    const [publicId, setPublicId] = useState(null);
    const [isAlertOpen, setIsAlertOpen] = useState(false);
    const [deleteUserPublicId, setDeleteUserPublicId] = useState(null);

    //this method will fetch all the users, (except admin, who can not be deleted, changed), every time the page loads
    //if somone with not ADMIN role, comes on this page, the reponse will not be 200 (OK), and an error snackbar will tell the client
    useEffect(() => {
        getRequest("/api/user/admin")
            .then(res => setUsers(res.data))
            .catch(err => {setIsNotAdmin(true);});
    }, [])

    //this function will handle the fetch to delete users
    //!!!!only users with ADMIN role can delete 
    function deleteUser() {
        request("DELETE", `/api/user/admin/${deleteUserPublicId}`)
            .then(res => window.location.reload(false))
            .catch(err => navigate(getLoginPage()))
    }

    //this function will handle the click event to delete a user
    function onDeleteUser(e, publicId) {
        e.preventDefault();
        setDeleteUserPublicId(publicId);
        setIsAlertOpen(true);
    }
    
    //this function will handle the closing of the error snackbar, if there was an error with creating someone
    const handleErrorCreate = (event, reason) => {
        if (reason === 'clickaway') {
            setIsnotCreated(false);
            return;
        }
        setIsnotCreated(false);
    };

    //this function will handle the publicId storage, for the user about to be edited
    const handleEditUser = (publicId) => {
        setPublicId(publicId);
        setIsEditUser(true);
    }

    //inserting elments to the vertual DOM
    //this compoent has multiple child componetns
    //EditUser.jsx and AddNewUser.jsx will only appear if the background is darkened. --see in their component
    return users ?
        <>
            <EditUser
                publicId={publicId}
                isEditUser={isEditUser}
                users={users}
                setErrorCreateText={setErrorCreateText}
                setIsnotCreated={setIsnotCreated}
            />
            <AddNewUser
                users={users}
                newUser={newUser}
                setErrorCreateText={setErrorCreateText}
                setIsnotCreated={setIsnotCreated}
            />
            <Button onClick={(e) => navigate(getStoriesForAdmin())} variant='contained' sx={{ top: "75vh", float: "left", left: "5%" }}>Mesékhez <NavigateNextIcon /></Button>
            <Fab color="primary" aria-label="add" sx={{ top: "75vh", float: "right", right: "5%" }} onClick={(e) => setNewUser(true)}>
                <AddIcon />
            </Fab>
            <UsersTable users={users} handleEditUser={handleEditUser} onDeleteUser={onDeleteUser} />
            <ErrorSnackBar open={isNotCreated} handleClose={handleErrorCreate} text={errorCreateText} />
            <AlertDialog
                titleText={"Biztos benne, hogy törölni akarja?"}
                secondaryText={"Ha ezt megteszi, nem fog a felhasználó a weblaphoz férni"}
                handleClose={() => setIsAlertOpen(false)}
                handleIsOkay={deleteUser}
                open={isAlertOpen} />
        </>
        : <><>{isNotAdmin ? <ErrorSnackBar open={isNotAdmin} text={"Nincs Admin Jogusultsága"} /> : <></>}</> <Loading /></>;
}
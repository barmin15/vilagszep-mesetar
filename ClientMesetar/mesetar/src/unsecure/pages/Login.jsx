//required methods and HTML elements
import { LoginForm } from './../components/LoginForm';
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { request } from '../../api/fetch';
import { deleteAuthToken, deleteUserLogin, deleteUserPublicId, setAuthToken, setUserLogin, setUserPublicId } from '../../logic/localStorage';

import ErrorSnackBar from "../components/ErrorSnackBar";

export default function Login() {
    //states for data needed to store in memory
    const [showPassword, setShowPassword] = useState(false);
    const [password, setPassword] = useState(null);
    const [login, setLogin] = useState(null);
    const [error, setError] = useState(false);
    const navigate = useNavigate();

    //clear local storage when being sent to login page
    useEffect(() => {
       deleteAuthToken();
       deleteUserLogin();
       deleteUserPublicId();
    }, [])

    //if login is not successfull, this method will handle the SnackBar's closing
    const handleError = (event, reason) => {
        if (reason === 'clickaway') {
            setError(false);
            return;
        }
        setError(false);
    };

    //this handles the enter key, if user wants to log in
    const pressEnter = (event) => {
        if (event.keyCode === 13) {
            onLogin(event);
        }
    }

    //if log in button is pressed, this method, will fetch the user info from the server and log in, or handle the http error messages
    function onLogin(e) {
        e.preventDefault();

        request("POST", "/api/auth/login", { login, password })
            .then(response => {
                setUserPublicId(response.data.publicId);
                setUserLogin(response.data.login);
                setAuthToken(response.data.token);
                navigate("/app/mesetar")
            })
            .catch(err => setError(true));
    }


    //inserting elements to the virtual DOM
    return <><LoginForm
        setLogin={setLogin}
        setPassword={setPassword}
        showPassword={showPassword}
        setShowPassword={setShowPassword}
        onLogin={onLogin}
        pressEnter={pressEnter}
    />
        <ErrorSnackBar open={error} handleClose={handleError} text={'Hibás felhasználónév vagy jelszó'} />
    </>
}
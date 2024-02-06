//imports
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getUserLogin } from "../../logic/localStorage";
import { getRequest } from "../../api/fetch";
import { getContinents, getAgeGroups, getCopyRight } from "../../api/entityEnums";
import SuccessSnackBar from "../../unsecure/components/SuccessSnackBar";
import Loading from "../../unsecure/components/Loading";

//most components are styled with MUI, this one is also styled with the card.css file
import "../css/keyWordCard.css";

//MUI import
import { Box } from "@mui/system";
import { getLoginPage } from "../../api/endpoints";

export default function Library() {
    const navigate = useNavigate();
    //states
    const [success, setSuccess] = useState(false);
    const [keyWords, setKeyWords] = useState(null);
    const [storyBag, setStoryBag] = useState(null);
    const [countries, setCountries] = useState(null);

    //this useEffect will fetch all the elements that are needed to be displayed, if response is not 200 (OK), you will be redricted to the login page
    useEffect(() => {
        const apis = [["/api/keyWord", setKeyWords], ["/api/country", setCountries], ["/api/storyBag", setStoryBag]];

        apis.forEach(api => {
            setSuccess(true);
            getRequest(api[0])
                .then(res => api[1](res.data.map(elem => elem.element)))
                .catch(err => navigate(getLoginPage))
        })

    }, [navigate])

    //this handles the closing of the success snackbar, to show the user who they logged in as
    //if you only want it to clode, by pressing the close button, set the setSuccess to false in the reason === clickaway scope 
    const handleSuccessLogin = (event, reason) => {
        if (reason === 'clickaway') {
            setSuccess(false);
            return;
        }
        setSuccess(false);
    };

    //inserting elements into the virtual DOM, while elements are null, the loadingBar will appear
    return (keyWords && storyBag && countries) ? <>
        {[['Kulcsszavak', keyWords, "keyWord"], ['Országok és kultúrkörök', countries, "country"], ['Mesetarisznya', storyBag, "storyBag"], ['Korosztályok', getAgeGroups(), "ageGroup"], ['Kontinensek', getContinents(), "continent"], ['Jogállás', getCopyRight(), "copyRight"]].map((header, index) => (
            <div className="cardContainer" key={index}>
                <div className="cardHeader">{header[0]}</div>
                <div className="cardBody">
                    <ul className="word-container">
                        {header[1].map((word, i) => <li key={i} className="listed-items"><a href={'/vilagszep/mesetar/app/mesek/filter/' + header[2] + '=' + word + "/search/all"} className="item">{word.replaceAll("_", " ")}</a>, </li>)}
                    </ul>
                </div>
            </div>
        ))}
        <Box sx={{ height: 50 }} />
        <SuccessSnackBar open={success} handleClose={handleSuccessLogin} text={'bejelentkezve ' + getUserLogin() + '-ként'} />
    </> : <Loading />
}
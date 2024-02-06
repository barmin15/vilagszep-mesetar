//imports
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getUserPublicId } from "../../logic/localStorage";
import { getRequest } from "../../api/fetch";
import StoryTable from "../components/StoryTable";
import Loading from "../../unsecure/components/Loading";

import { Box, Typography } from "@mui/material";
import { getLoginPage } from "../../api/endpoints";

export default function Profile() {
    const navigate = useNavigate();
    const [stories, setStories] = useState(null);

    //this useEffect fetches the liked stories of the current user, via user publicId stored in the sessionStorage
    useEffect(() => {
        getRequest(`/api/user/likedStories/${getUserPublicId()}`)
            .then((res) => setStories(res.data))
            .catch((err) => navigate(getLoginPage()));
    }, [navigate]);

    //rendering the favourite stories via the StoryTable child component
    //if the user has no liked stories, the loader will appear with text telling the user, that there are no liked stories
    return stories ? (<>
        <Typography gutterBottom sx={{ textAlign: "center", paddingTop: 5, color: "#34445C", fontSize: { xs: 25, sm: 32 } }}>
            {stories.length < 1 ? "Még nincsenek kedvenc meséid" : "A kedvenc meséid"}
        </Typography>
        {stories.length < 1 ? <Loading /> : <><Box sx={{ height: 30 }} /><StoryTable stories={stories} /> </>}
    </>) : (<Loading />);
}

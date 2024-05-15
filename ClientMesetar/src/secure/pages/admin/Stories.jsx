//imports
import { useNavigate } from "react-router-dom"
import { useEffect, useState } from "react";
import { getRequest } from "../../../api/fetch";
import StoriesTable from "../../components/admin/StoriesTable";
import AddStory from "../../components/admin/story/AddStory";
import EditStory from "../../components/admin/story/EditStory";
import { request } from "../../../api/fetch";
import Loading from "../../../unsecure/components/Loading";

//MUI imports
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import { Button, Fab } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import Backdrop from '@mui/material/Backdrop';
import { getLoginPage, getUsersForAdminPage } from "../../../api/endpoints";

export default function Stories() {
    const navigate = useNavigate();
    //states
    const [stories, setStories] = useState(null);
    const [isNewStory, setIsNewStory] = useState(false);
    const [isEditStory, setIsEditStory] = useState(false);
    const [selectedStoryPublicId, setSelectedStoryPublicId] = useState(null);

    //this function fetches the stories from the server
    //only an ADMIN role can fetch this -- see the server to know why
    useEffect(() => {
        getRequest("/api/story/admin")
            .then(res => setStories(res.data))
            .catch(err => navigate(getLoginPage()));
    }, [navigate])

    //this function handles the event, when the client clicks to delete a story
    function handleDeleteStory(publicId) {
        request("DELETE", `/api/story/admin/${publicId}`)
            .then(res => window.location.reload(false))
            .catch(err => navigate(getLoginPage()));
    }

    //inserting elements to the vertual DOM
    //this component has multiple child components
    //first child component is the AddStory.jsx, where you can create a new story
    //second is the EditStory.jsx where you can edit stories
    //both of these will be rendered while the background will turn darker-- see Backdroop below
    return stories ? <>
        <Backdrop
            sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={isNewStory}
        >
            <AddStory isOpen={isNewStory} />

        </Backdrop>
        <Backdrop
            sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={isEditStory}
        >
            <EditStory publicId={selectedStoryPublicId} isOpen={isEditStory} />

        </Backdrop>
        <StoriesTable stories={stories} setIsEditStory={setIsEditStory} setSelectedStoryPublicId={setSelectedStoryPublicId} handleDeleteStory={handleDeleteStory} />
        <Button onClick={(e) => navigate(getUsersForAdminPage())} variant='contained' sx={{ top: "75vh", float: "left", left: "5%" }}><NavigateBeforeIcon />Felhasználókhoz</Button>
        <Fab color="primary" aria-label="add" sx={{ top: "75vh", float: "right", right: "5%" }} onClick={(e) => setIsNewStory(true)}>
            <AddIcon />
        </Fab>
    </> : <Loading />
}
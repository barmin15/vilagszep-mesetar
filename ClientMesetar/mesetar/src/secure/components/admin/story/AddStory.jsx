//imports
import React, { useEffect, useState } from "react";
import { request, getRequest } from "../../../../api/fetch";
import { useNavigate } from "react-router-dom";
import { isValidRegisterStory } from "../../../../logic/registerLogic";
import { StoryForm } from './storyForm/StoryForm';
import { getStoryBody } from "../../../../api/entityEnums";

//most components are styled with MUI elements, this one is styled with the addStory.css file
import "../../../css/addStory.css";

export default function AddStory({ isOpen }) {
    const navigate = useNavigate();
    //states to store data
    const [story, setStory] = useState(getStoryBody());
    const [titles, setTitles] = useState(null);
    const [isNotValidRegisterStory, setIsNotValidRegisterStory] = useState(false);

    //this function handles the fetching of all the stories, in order to not create one like before
    useEffect(() => {
        if (isOpen) {
            getRequest("/api/story/titles")
                .then(res => setTitles(res.data))
                .catch(err => navigate("/"));
        }
    }, [isOpen, navigate])

    //this function handles the event when a client clicks to create a new story
    function onSubmit(e) {
        e.preventDefault();

        if (isValidRegisterStory(story, titles)) {
            request("POST", "/api/story/admin/create", story)
                .then(res => window.location.reload(false))
                .catch(err => navigate("/"));

            //if the story's data is not properly set, an error snakcbar will appear, telling the client
        } else setIsNotValidRegisterStory(true);
    }

    //this function handles the event when the client cancels creating a new story
    //the page will reload, all set data will be lost
    function onCancel(e) {
        e.preventDefault();
        window.location.reload(false)
    }

    //this function handles the event to close the error snackbar
    //it is set to close on any new event, but you can set it to only close when clicking close-- simply set the reason === clickaway scope to true
    const handleErrorCreate = (event, reason) => {
        if (reason === 'clickaway') {
            setIsNotValidRegisterStory(false);
            return;
        }
        setIsNotValidRegisterStory(false);
    };

    //calling the child component to render the elements
    return <StoryForm story={story} setStory={setStory} onSubmit={onSubmit} onCancel={onCancel} isNotValidRegisterStory={isNotValidRegisterStory} handleErrorCreate={handleErrorCreate} />

}



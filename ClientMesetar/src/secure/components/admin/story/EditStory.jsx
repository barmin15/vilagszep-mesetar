//imports
import React, { useEffect, useState } from "react";
import { request, getRequest } from "../../../../api/fetch";
import { useNavigate } from "react-router-dom";
import { isValidRegisterStory } from "../../../../logic/registerLogic";
import { StoryForm } from './storyForm/StoryForm';
import Loading from "../../../../unsecure/components/Loading";
//CSS import
import "../../../css/addStory.css";

//!!!!most components are styled with MUI elements, this is styled with the addStory.css file!!!!
export default function AddStory({ publicId, isOpen }) {
    const navigate = useNavigate();
    //states for storing data
    const [story, setStory] = useState(null);
    const [titles, setTitles] = useState(null);
    const [previousTitle, setPreviousTitle] = useState(null);
    const [isNotValidRegisterStory, setIsNotValidRegisterStory] = useState(false);

    //this useEffect is to fetch the story titles, in order to not create one already existing story
    //it also fetches all the previously added keywords, storyBags and countries for the selected story 
    useEffect(() => {
        if (isOpen) {
            getRequest("/api/story/titles")
                .then(res => setTitles(res.data))
                .catch(err => navigate("/login"));

            getRequest(`/api/story/admin/${publicId}`)
                .then(res => {
                    setPreviousTitle(res.data.title)
                    res.data.keyWords = res.data.keyWords.map(elem => elem.element);
                    res.data.storyBags = res.data.storyBags.map(elem => elem.element);
                    res.data.countries = res.data.countries.map(elem => elem.element);
                    setStory(res.data);
                })
                .catch(err => navigate("/login"));
        }
    }, [isOpen, navigate, publicId]);

    //this function handles the event, when a new story is registered
    //if server responds with code 200 (OK), the page will reload
    function onSubmit(e) {
        e.preventDefault();

        if (isValidRegisterStory(story, titles.filter(e => e !== previousTitle))) {
            request("PUT", `/api/story/admin/${publicId}`, story)
                .then(res => window.location.reload(false))
                .catch(err => navigate("/login"));

            //in case a story's data is not ready, an error bar will pop up      
        } else setIsNotValidRegisterStory(true);
    }

    //this function handles th event, when a client decides to quit editing a story
    //th epage will reload, and all the data will be lost
    function onCancel(e) {
        e.preventDefault();
        window.location.reload(false)
    }

    //this function handles the event to close the error pop up bar (clicking anywhere will disable it)
    const handleErrorCreate = (event, reason) => {
        if (reason === 'clickaway') {
            setIsNotValidRegisterStory(false);
            return;
        }
        setIsNotValidRegisterStory(false);
    };

    //calling child component to render elments
    //in case story is null, a loading bar will appear
    return story ? <StoryForm story={story} setStory={setStory} onSubmit={onSubmit} onCancel={onCancel} isNotValidRegisterStory={isNotValidRegisterStory} handleErrorCreate={handleErrorCreate} />
        : <Loading />

}



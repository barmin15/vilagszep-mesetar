import { StoryCardBox } from './storyPage/StoryCardBox';
import React, { useState } from 'react';
import SuccessSnackBar from "../../unsecure/components/SuccessSnackBar"
import { request } from "../../api/fetch";
import { getUserPublicId } from '../../logic/localStorage';
import { useNavigate } from "react-router-dom"

export default function StoryCard({ story }) {
    const navigate = useNavigate();
    const [isFullText, setIsFullText] = useState(false);
    const [isCopied, setIsCopyed] = useState(false);
    const [isLiked, setIsLiked] = useState(story.liked);

    //this function handles the successBar's closing, after a successful copy 
    const handleSuccessCopy = (event, reason) => {
        if (reason === 'clickaway') {
            setIsCopyed(false);
            return;
        }
        setIsCopyed(false);
    };

    //this function handles, when the client clicks on the copy story text, it simply copies to the clipboard
    function onCopyText(e) {
        e.preventDefault();
        navigator.clipboard.writeText(story.text)
        setIsCopyed(true);
    }

    //this function handles when the client clicks the like button. the server will either like or dislike
    function onLike(e) {
        e.preventDefault();
        request("POST", `/api/user/likeStory/${story.publicId}/${getUserPublicId()}`, {})
            .then(res => setIsLiked(!isLiked))
            .catch(err => navigate("/login"));
    }

    //inserting elements into the vertual DOM
    return (
        <>
            <StoryCardBox story={story} setIsFullText={setIsFullText} isFullText={isFullText} onCopyText={onCopyText} isLiked={isLiked} onLike={onLike} />
            <SuccessSnackBar open={isCopied} handleClose={handleSuccessCopy} text={"Szöveg kimásolva"} />
        </>
    );

}
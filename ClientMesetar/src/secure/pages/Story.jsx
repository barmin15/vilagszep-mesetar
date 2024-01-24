//imports
import { useEffect, useState } from "react"
import { getRequest } from "../../api/fetch";
import { getPublicIdFromPath } from "../../logic/filterLogic";
import { useLocation, useNavigate } from "react-router-dom";
import { getUserPublicId } from "../../logic/localStorage";
import StoryCard from "../components/StoryCard";
import Loading from "../../unsecure/components/Loading";

export default function Story() {
    const location = useLocation();
    const navigate = useNavigate();
    const [story, setStory] = useState(null);

    //this useEffect fetches the story by the publicID it recieves from the path
    useEffect(() => {
        getRequest(`/api/story/${getPublicIdFromPath(location.pathname)}/${getUserPublicId()}`)
            .then(res => setStory(res.data))
            .catch(err => navigate("/login"));
    }, [location.pathname, navigate]);

    //callin the child component to render the story 
    return story ? <StoryCard story={story}/> : <Loading />
}
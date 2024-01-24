//imports
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { getRequest } from "../../api/fetch";
import {getFilterFromPath, getSearchFromPath} from "../../logic/filterLogic";
import {  getContinents, getCopyRight, getAgeGroups } from "../../api/entityEnums";
import { Box } from "@mui/material";
import FilterElement from "../components/FilterElement";
import StoryTable from "../components/StoryTable";
import Loading from "../../unsecure/components/Loading";

//creating an array, with all the data, so you can map them in the return statement, for cleaner code
//if more data is added, the first element is the array with the data, the second is the data name in the database, the third is what the client sees as a collective name
const filterApis = [
  ["/api/keyWord", "keyWord", "kulcsszó"],
  ["/api/country", "country", "ország/kultúra"],
  ["/api/storyBag", "storyBag", "mesetarisznya"],
  [getAgeGroups(), "ageGroup", "korosztály"],
  [getContinents(), "continent", "kontinens"],
  [getCopyRight(), "copyRight", "jogállás"]
];

export default function AllStories() {
  const location = useLocation();
  const navigate = useNavigate();
  const [filter, setFilter] = useState({ keyWord: '', storyBag: '', country: '', ageGroup: '', continent: '', copyRight: '' });
  const [stories, setStories] = useState(null);

console.log(stories)

  useEffect(() => {
    const decodedPath = getFilterFromPath(decodeURIComponent(location.pathname));
    if (decodedPath.field) setFilter({ ...filter, [decodedPath.field]: decodedPath.filter });
  }, []);

  //this useEffecf will fetch the filtered array of stories from the server, knowing how to filter from the url (path)
  useEffect(() => {
    const filterObj = { ...filter };

    //if element is empty, that means we need to get all the types from the database
    for (const elem in filterObj) if (filterObj[elem] === "") filterObj[elem] = "all";

    //this long path is the url, which the server will read and return a filtered list of all the elements
    const filterPath = `/api/story/filter/keyWord=${filterObj.keyWord}/country=${filterObj.country}/storyBag=${filterObj.storyBag}/ageGroup=${filterObj.ageGroup}/continent=${filterObj.continent}/copyRight=${filterObj.copyRight}/search=${getSearchFromPath(decodeURIComponent(location.pathname))}`;

    getRequest(filterPath)
      .then(res => setStories(res.data))
      .catch(err => navigate("/login"));
  }, [filter, location.pathname, navigate]);

  //two child components are called, the FilterElement, which handles all the types of filtering, and the storyTable, which returns the stories
  return (
    stories ? <>
      <Box sx={{ textAlign: "center", paddingBottom: 0.5 }}>
        {filterApis.map((api, i) => (
          <FilterElement
            key={api[1]}
            getRequestApi={i < 3 ? api[0] : null}
            elements={i < 3 ? null : api[0]}
            element={filter}
            objectKey={api[1]}
            label={api[2]}
            setElement={setFilter}
          />
        ))}
      </Box>
      <Box sx={{ height: { xs: 4, sm: 34 }, width: "100vw" }} />
      <StoryTable stories={stories} />
    </> : <Loading />
  );
}
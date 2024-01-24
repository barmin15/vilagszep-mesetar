//imports
import React from "react";
import { getContinents, getAgeGroups, getCopyRight } from "../..../../../../../../api/entityEnums";
import MultipleSelect from "./MultipleSelect";
import ErrorSnackBar from "../../../../../unsecure/components/ErrorSnackBar";

//MUI import
import { Button, MenuItem, Select } from "@mui/material";

//this function doesn't handle logic, only displaying, elements, and setting the input data
export function StoryForm({
  //props from parent component
  story,
  setStory,
  onSubmit,
  onCancel,
  isNotValidRegisterStory,
  handleErrorCreate
}) {

  //this function handles the events, when data is set by the client
  function handleFormInput(e) {
    //the story state's only data that will change, is the one, whose key matches the currently changing elem
    setStory({
      ...story,
      [e.target.name]: e.target.value
    })
  }

  //inserting elements to the vertual DOM
  //calling the MultipleSelect.jsx child component
  return <div className="addStoryContainer">
    <form className="addStoryForm">
      <div className="rowContainer">
        <label htmlFor="Cím" className="label">Cím</label>
        <label htmlFor="Származási hely (kontinens)" className="halfLabel">Származási hely (kontinens)</label><br />
        <input className="halfInput" type="text" id="Cím" name="title" placeholder="Cím.." value={story.title} onChange={handleFormInput} />

        <Select sx={{
          width: '50%',
          backgroundColor: "white",
          height: {
            xs: 29,
            sm: 42
          }
        }} labelId="demo-simple-select-label" id="demo-simple-select" name="continent" value={story.continent} label="continents" onChange={handleFormInput}>
          {getContinents().map(continent => <MenuItem key={continent} value={continent}>{continent.replaceAll('_', ' ')}</MenuItem>)}
        </Select><br />
      </div>

      <div className="rowContainer">
        <MultipleSelect elem={"countries"} story={story} selectElements={story.countries} setStory={setStory} postApiEndpoint={"/api/country/admin/add"} getApiEndpoint={"/api/country"} errorText={"Ez a oszág/kultúra már létezik"} mainText={"Országok/kultúrák"} secondaryText={"Adj hozzá újat"} />
        <br />
      </div>


      <div className="rowContainer">

        <MultipleSelect elem={"storyBags"} story={story} selectElements={story.storyBags} setStory={setStory} postApiEndpoint={"/api/storyBag/admin/add"} getApiEndpoint={"/api/storyBag"} errorText={"Ez a mesetarisznya már létezik"} mainText={"Mesetarisnyák"} secondaryText={"Adj hozzá újat"} />
        <br />
      </div>

      <div className="rowContainer">

        <MultipleSelect elem={"keyWords"} story={story} selectElements={story.keyWords} setStory={setStory} postApiEndpoint={"/api/keyWord/admin/add"} getApiEndpoint={"/api/keyWord"} errorText={"Ez a kulcsszó már létezik"} mainText={"Kulcsszavak"} secondaryText={"Adj hozzá újat"} />
        <br />
      </div>

      <div className="rowContainer">
        <label htmlFor="legalStatus" className="label">Jogállás</label>
        <label htmlFor="Korosztály" className="halfLabel">Korosztály</label><br />
        <Select sx={{
          width: '50%',
          backgroundColor: "white",
          height: {
            xs: 29,
            sm: 42
          }
        }} labelId="demo-simple-select-label" id="demo-simple-select" name="copyRight" value={story.copyRight} label="Age" onChange={handleFormInput}>
          {getCopyRight().map(copyRight => <MenuItem value={copyRight}>{copyRight.replaceAll('_', ' ')}</MenuItem>)}
        </Select>
        <Select sx={{
          width: '50%',
          backgroundColor: "white",
          height: {
            xs: 29,
            sm: 42
          }
        }} labelId="demo-simple-select-label" id="demo-simple-select" name="ageGroup" value={story.ageGroup} label="Age" onChange={handleFormInput}>
          {getAgeGroups().map(ageGroup => <MenuItem value={ageGroup}>{ageGroup.replaceAll('_', ' ')}</MenuItem>)}
        </Select>
        <br />
      </div>
      <div className="rowContainer">
        <label htmlFor="Forrás" className="label">Forrás</label>
        <br />
        <input className="simpleInput" type="text" id="Forrás" name="source" placeholder="Forrás.." value={story.source} onChange={handleFormInput} />


        <br />
      </div>
      <div className="rowContainer">
        <label htmlFor="Comment" className="label">Megjegyzés</label> <br />
        <input className="simpleInput" type="text" id="comment" name="comment" placeholder="Megjegyzés.." value={story.comment} onChange={handleFormInput} />
        <br />
      </div>
      <div className="rowContainer">
        <label htmlFor="story" className="label">Mese szövege</label> <br />
        <input className="simpleInput" type="text" id="story" name="text" placeholder="Mese szövege.." value={story.text} onChange={handleFormInput} />
        <br />
      </div>
      <div className="buttonContainer">
        <Button sx={{
          top: 5,
          right: 15
        }} color="primary" size="large" variant="contained" onClick={onSubmit}> MENTÉS</Button>
        <Button sx={{
          top: 5,
          left: 15
        }} color="primary" size="large" variant="contained" onClick={onCancel}> MÉGSE</Button>
      </div>
    </form>
    <ErrorSnackBar open={isNotValidRegisterStory} handleClose={handleErrorCreate} text={"Létezik már ilyen cím, vagy valami nem lett minden kitöltve"} />
  </div>;
}

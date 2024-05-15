import { useState, useEffect } from 'react';
import { request, getRequest } from '../../../../../api/fetch';
import { useNavigate } from 'react-router-dom';
import ErrorSnackBar from '../../../../../unsecure/components/ErrorSnackBar';

import AddIcon from '@mui/icons-material/Add';
import { MenuItem, OutlinedInput, Select } from '@mui/material';
import { getLoginPage } from '../../../../../api/endpoints';

export default function MultipleSelect({
    //props from StoryForm.jsx component
    story, elem, selectElements, setStory, postApiEndpoint, getApiEndpoint, errorText, mainText, secondaryText }) {
    const navigate = useNavigate();
    const [element, setElement] = useState('');
    //states
    const [allSelectElements, setAllSelectElements] = useState(null);
    const [isAlreadyIncluded, setIsAlreadyIncluded] = useState(false);

    useEffect(() => {
        //fetching the elements
        getRequest(getApiEndpoint)
            .then(res => setAllSelectElements(res.data))
            .catch(err => navigate(getLoginPage()));
    }, [getApiEndpoint, navigate])

    //when creating new element this function will send the element back to the server, where it will save it to the database
    function onAddSelectElement(e) {
        e.preventDefault();

        if (element.length > 2 && !allSelectElements.map(word => word.element).includes(element)) {
            request("POST", postApiEndpoint, { element })
                .then(res => onAddNewSelectElement(res.data))
                .catch(err => navigate(getLoginPage()));
            setElement("");
        } else {
            setIsAlreadyIncluded(true);
        }
    }

    //adding the selected element to the current story
    function onKeyWordSelect(e) {
        setStory({
            ...story,
            [elem]: e.target.value
        })
    }

    //adding the just created element to the current story, and to the selectable elements list
    function onAddNewSelectElement(word) {
        setAllSelectElements([word, ...allSelectElements]);
        setStory({
            ...story,
            [elem]: [...selectElements, word.element]
        })
    }

    //this function will handle the closing of the error tab
    const handleErrorCreate = (event, reason) => {
        if (reason === 'clickaway') {
            setIsAlreadyIncluded(false);
            return;
        }
        setIsAlreadyIncluded(false);
    };

    //handle pressing Enter key
    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            onAddSelectElement(event);
        }
    };

    //inserting elements to the virtual DOM
    return <>
        <label className="label">{mainText}</label><label className="halfLabel">{secondaryText}</label><br />
        <Select
            sx={{ width: '50%', backgroundColor: "white", height: { xs: 29, sm: 42 } }}
            multiple
            value={selectElements}
            onChange={onKeyWordSelect}
            input={<OutlinedInput label="Multiple Select" />}
        >
            {allSelectElements?.map((elem) => (
                <MenuItem key={elem.publicId} value={elem.element} sx={{ '&:hover': { bgcolor: '#EEF5FF' } }}>
                    {elem.element}
                </MenuItem>))}
        </Select>
        <input className="halfInputWithButton" value={element} onChange={(e) => setElement(e.target.value)} onKeyPress={handleKeyPress} />
        <div className="addHalfInput" onClick={onAddSelectElement}>
            <AddIcon sx={{ color: "black", "&:hover": { color: "blue", cursor: "pointer" } }}></AddIcon>
        </div>
        <ErrorSnackBar open={isAlreadyIncluded} handleClose={handleErrorCreate} text={errorText} />
    </>
}

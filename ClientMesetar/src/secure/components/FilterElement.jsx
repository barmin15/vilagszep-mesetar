//imports
import React, { useEffect, useState } from 'react';
import { getRequest } from '../../api/fetch';
import { useNavigate } from 'react-router-dom';

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { getLoginPage } from '../../api/endpoints';

//props from the parent element (AllStories.jsx)
export default function FilterElement({ element, setElement, getRequestApi, label, elements, objectKey }) {
  const navigate = useNavigate();
  const [allElements, setAllElements] = useState(null);

  //this useEffect will handle fetching the different elements to filter the stories with
  useEffect(() => {
    if (getRequestApi) {
      getRequest(getRequestApi)
        .then(res => setAllElements(res.data.map(elem => elem.element)))
        .catch(err => navigate(getLoginPage()));
    } else {
      setAllElements(elements);
    }
  }, [getRequestApi, navigate, elements]);

  //this function handles you selecting an element to filter the stories with.
  const onSelect = (e) => {
    e.preventDefault();
    setElement({
      ...element,
      [objectKey]: e.target.value
    });
  };

  //inserting elements to the vertual DOM
  //this MUI code is responsive, so be aware to change both the xs, and sm tags if you want change on both mobile and bigger devices (with more pixels)
  return (
    <FormControl variant="outlined" sx={{ m: 1, width: { xs: "27%", sm: '12%' }, marginTop: { xs: 1, sm: 3 } }}>
      <InputLabel htmlFor={`filter-select-${objectKey}`} sx={{ fontSize: 14, top: -10 }}>
        {label}
      </InputLabel>
      <Select
        label={label}
        labelId={`filter-label-${objectKey}`}
        id={`filter-select-${objectKey}`}
        value={element[objectKey]}
        onChange={onSelect}
        sx={{
          '& .MuiOutlinedInput-notchedOutline': {
            borderColor: '#49789F',
          },
          '&:hover .MuiOutlinedInput-notchedOutline': {
            borderColor: '#49789F',
          },
          height: 30,
          fontSize: 12,
          paddingTop: 0.5,
          paddingBottom: 0.5,
        }}
      >
        <MenuItem sx={{ '&:hover': { bgcolor: '#EEF5FF' } }} value="">
          <em>összes</em>
        </MenuItem>
        {allElements?.map((elem, index) => (
          <MenuItem sx={{ '&:hover': { bgcolor: '#EEF5FF' } }} value={elem} key={index}>
            {elem.replaceAll("_", " ")}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
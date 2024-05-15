//imports
import React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import VisibilityIcon from '@mui/icons-material/Visibility';
import Paper from '@mui/material/Paper';
import { useNavigate } from 'react-router-dom';
import { getStoryPage } from '../../api/endpoints';

//this child component has multiple parent components, since the story table is rendered and called on multiple pages
//if you change something, make sure it doesnt interfere with the other pages
export default function StoryTable({ stories }) {
  const navigate = useNavigate();

  //this function will handle the event, when the user clicks on the 'eye' icon to view the story
  //it will navigate to a different page
  function onViewStory(e, publicId) {
    e.preventDefault();
    navigate(getStoryPage(publicId));
  }

  //this table was made to be responsive. the xs-tag is for mobile phones, the sm-tag is for other (with more pixels) devices
  //inserting elements to the vertual DOM
  return (
    <TableContainer
      component={Paper}
      elevation={3}
      sx={{
        maxHeight: { xs: '70vh', sm: '70vh', },
        width: { xs: '100%', sm: '80%' },
        margin: '0 auto',
        overflow: 'auto',
      }}
    >
      <Table stickyHeader aria-label="sticky table" sx={{ maxWidth: '100%', width: '100%' }}>
        <TableHead sx={{ backgroundColor: "#4B79A1", }}>
          <TableRow>
            <TableCell align="center" sx={{ fontSize: 16, width: { xs: '20%', sm: '25%' }, backgroundColor: "#4B79A1", color: 'white' }}>Cím</TableCell>
            <TableCell align="center" sx={{ fontSize: 15, width: { xs: '20%', sm: '25%' }, backgroundColor: "#4B79A1", color: 'white' }}>Korosztály</TableCell>
            <TableCell align="right" sx={{ fontSize: 15, width: { xs: '20%', sm: '25%' }, backgroundColor: "#4B79A1", color: 'white' }}>Elolvasom</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {stories?.map((story, index) => (
            <TableRow key={index} sx={{ '&:last-child td, &:last-child th': { border: 0 }, bgcolor: "#F6F1F1", }}>
              <TableCell component="th" scope="row" align="center" sx={{ fontSize: 15, width: '25%' }}>
                {story.title}
              </TableCell>
              <TableCell align="center" sx={{ width: '25%' }}>{story.ageGroup.replaceAll('_', ' ')}</TableCell>
              <TableCell align="right">
                <VisibilityIcon
                  onClick={(e) => onViewStory(e, story.publicId)}
                  sx={{ '&:hover': { color: 'blue', cursor: 'pointer' } }}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
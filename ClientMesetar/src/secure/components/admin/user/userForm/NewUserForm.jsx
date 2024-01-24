import React from "react";

//MUI imports
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Button, FormControl, Stack } from "@mui/material";
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';

//this component is only to render elements, the parent component handles all the logic 
export function NewUserForm({
  //props from parent component
  setLogin,
  setPassword,
  role,
  setRole,
  onAddNewUser
}) {

  //inserting elements into the vertual DOM 
  return <Box component="form" sx={{
    '& > :not(style)': {
      m: 1,
      width: '35ch'
    }
  }} noValidate autoComplete="off">
    <FormControl>
      <Stack spacing={2}>
        <TextField onChange={e => setLogin(e.target.value)} required label="Felhasználónév" variant="filled" sx={{
          backgroundColor: "#F8EDE3",
        }}>
        </TextField>
        <TextField onChange={e => setPassword(e.target.value)} variant="filled" required label="Jelszó" sx={{
          backgroundColor: "#F8EDE3"
        }} InputProps={{}} />
        <Select labelId="demo-simple-select-filled-label" id="demo-simple-select-filled" value={role} onChange={e => setRole(e.target.value)} sx={{
          backgroundColor: "#F8EDE3"
        }}>
          <MenuItem value={"USER"} variant="filled" sx={{
            backgroundColor: "#F8EDE3"
          }}>USER</MenuItem>
          <MenuItem value={"ADMIN"} sx={{
            backgroundColor: "#F8EDE3"
          }}>ADMIN</MenuItem>
        </Select>
      </Stack>
      <Button sx={{
        top: 11
      }} color="primary" size="large" variant="contained" onClick={onAddNewUser}> MENTÉS</Button>
      <Button sx={{
        top: 22
      }} color="primary" size="large" variant="contained" onClick={e => window.location.reload(false)}> MÉGSE</Button>
    </FormControl>
  </Box>;
}

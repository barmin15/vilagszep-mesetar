import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

export default function AlertDialog({ titleText, secondaryText, handleClose, handleIsOkay, open }) {
  const theme = useTheme();
  //when viewed on mobile, the alert will be full width
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

  //inserting elments into the the vertual DOM
  return (
    <React.Fragment>
      <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {titleText}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {secondaryText}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleIsOkay}>Igen</Button>
          <Button onClick={handleClose} autoFocus>Nem</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
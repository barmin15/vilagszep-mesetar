import React from "react";
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

export default function SuccessSnackBar({
    //props needed from any parent method
    open,
    handleClose,
    text
}) {

    const Alert = React.forwardRef(function Alert(props, ref) {
        return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
    });

    //this is the element poping up on the left side of the screen to share information with the client
    return <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success" sx={{
            width: '100%'
        }}>
            {text}
        </Alert>
    </Snackbar>;
}


/*
this is what you need in the parent component to call this: 
(you can see on the Login page, how to call it)

const [open, setOpen] = useState(false);
;
  
    const handleClose = (event, reason) => {
      if (reason === 'clickaway') {
        setOpen(false);
        return;
      }
      setOpen(false);
    };


    in the return statement add this: 

      <SuccessSnackBar open={open} handleClose={handleClose} text={'succesfully logged in'}/>


*/
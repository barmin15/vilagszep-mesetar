import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

export default function Loading() {
    //whenever the server answer is slow, or the page hasnt loaded fully, this component can be shown
    //simply import and add to the return statement with a conditional rendering, or if statement
    
    return (
        <Box sx={{ display: 'flex'}}>
            <CircularProgress
                size={100}
                sx={{
                    position: 'absolute',
                    top: '45%',
                    left: '49%',
                    marginTop: '-50px',
                    marginLeft: '-50px'
                }}
            />
        </Box>
    );
}
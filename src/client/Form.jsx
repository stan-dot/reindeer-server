import { Button } from '@material-ui/core';
import { io } from 'socket.io-client';
import Snackbar from '@material-ui/core/Snackbar';
import Typography from '@material-ui/core/Typography';

import ButtonGroup from '@material-ui/core/ButtonGroup';
import IconButton from '@material-ui/core/IconButton';
import Box from '@material-ui/core/Box';
import TextField from '@material-ui/core/TextField';

/**
 * parameters for search
 * hotel stars
 * money per person
 * number of people
 * city
 * time
 * 
 * vaccination status
 * language
 * @returns 
 */
export default function Form() {
  const socket = io()
  socket.on("data", data => {

  })
  return <Box
    component="form"
    sx={{
      '& > :not(style)': { m: 1, width: '25ch' },
    }}
    noValidate
    autoComplete="off"
  >
    <Typography variant='h6' gutterBottom component={"div"}>
      search the terms you need 
    </Typography>
    <TextField id="outlined-basic" label="Outlined" variant="outlined" />
    <TextField id="filled-basic" label="Filled" variant="filled" />
    <TextField id="standard-basic" label="Standard" variant="standard" />
    <ButtonGroup variant='contained'>
      <Button
        className={"submitButton"}
        variant="contained"
        id="suppressButton"
        color="primary"
        component="button"
        onClick={console.log("clicked!")}
        disabled={false}>
          Submit
      </Button>;

    </ButtonGroup>
  </Box>
}
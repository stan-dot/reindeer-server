import { Button } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import MenuItem from '@material-ui/core/MenuItem';
import * as React from 'react';
import { useState } from 'react';
import DateRangePicker from '@wojtekmaj/react-daterange-picker';
import { io } from 'socket.io-client';

const currencies = [
  {
    value: 'USD',
    label: '$',
  },
  {
    value: 'EUR',
    label: '€',
  },
];


const TEXTFIELD_LABELS = {
  OUTLINED: "outlined",
  FILLED: "filled",
  STANDARD: "standard"
}

/**
 * PARAMETERS FOR SEARCH
 * hotel stars
 * money per person
 * number of people
 * TODO a dropdown menu to see if per person or total
 * city
 * time
 * TODO use this https://www.npmjs.com/package/react-date-picker
 *
 * vaccination status
 * language
 * TODO dropdown checklist for languages
 * @returns 
 */
export default function Form() {
  const socket = io()
  socket.on("data", data => {

  })
  const [value, onChange] = useState([new Date(), new Date()]); const [currency, setCurrency] = React.useState('EUR');
  const handleChange = (event) => {
    setCurrency(event.target.value);
  };


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
    <TextField
      id="outlined-basic"
      label="hotelStars"
      variant={TEXTFIELD_LABELS.OUTLINED}
    />
    <TextField
      id="filled-basic"
      label="budgetPerPerson"
      variant="filled" />

    <TextField
      id="standard-basic"
      label="numberOfPeople"
      variant="standard" />

    <DateRangePicker
      value={value}
      onChange={onChange}
    />
    <TextField
      id="standard-basic"
      label="vaccinations"
      variant="standard"
    />
    <TextField
      id="standard-basic"
      label="languages"
      variant="standard"
    />
    <ButtonGroup variant='contained'>
      <Button
        className={"submitButton"}
        variant="contained"
        id="submitButton"
        color="primary"
        component="button"
        onClick={console.log("clicked!")}
        disabled={false}>
        Submit
      </Button>
      <Button
        className={"resetButton"}
        variant="contained"
        id="resetButton"
        color="primary"
        component="button"
        onClick={console.log("clicked!")}
        disabled={false}>
        Reset
      </Button>;
    </ButtonGroup>
    <Box
      component="form"
      sx={{
        '& .MuiTextField-root': { m: 1, width: '25ch' },
      }}
      noValidate
      autoComplete="off"
    >
      <div>
        <TextField
          id="outlined-select-currency"
          select
          label="Select"
          value={currency}
          onChange={handleChange}
          helperText="Please select your currency"
        >
          {currencies.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          id="outlined-select-currency-native"
          select
          label="Native select"
          value={currency}
          onChange={handleChange}
          SelectProps={{
            native: true,
          }}
          helperText="Please select your currency"
        >
          {currencies.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </TextField>
      </div>
      
    </Box>
  </Box>
}
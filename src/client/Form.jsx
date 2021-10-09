import { Button, Paper } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import { Grid } from '@material-ui/core';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import MenuItem from '@material-ui/core/MenuItem';
import * as React from 'react';
import { useState } from 'react';
import DateRangePicker from '@wojtekmaj/react-daterange-picker';
import { io } from 'socket.io-client';
import { MyButton } from './helpers/Elements';

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
  const [value, onChange] = useState([new Date(), new Date()]);
  const [currency, setCurrency] = React.useState('EUR');
  const handleChange = event => {
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
    <Paper elevation={5}>
      <MyTextField str="hotelStars" />
      <MyTextField str="budgetPerPerson" />
      <MyTextField str="city" />
      <MyTextField str="numberOfTravellers" />
      <MyTextField str="vaccinations" />
      <MyTextField str="languages" />
      <TextField
        id="standard-basic"
        label="Number of people"
        variant="standard" select />

      <DateRangePicker
        fontFamily={"sans-serif"}
        value={value}
        onChange={onChange}
      />
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
    </Paper>
    <Grid
      container
      spacing={0}
      direction="column"
      alignItems="center"
      justifyContent="center"
      style={{ minHeight: '10vh' }}
    >
      <ButtonGroup variant='contained' aria-label="outlined primary button group" >
        <MyButton name={"submit"} />
        <MyButton name={"reset"} />
      </ButtonGroup>
    </Grid>
  </Box>
}

function MyTextField({ str, variant = TEXTFIELD_LABELS.OUTLINED }) {
  return <TextField
    id={str}
    label={str.toLowerCase()}
    variant={variant}
    style={{minHeight:'10vh'}}
  />
}
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
 * money per person
 * number of people
 * city
 * time
 * @returns 
 */
export default function Form() {
  const socket = io()
  socket.on("data", data => {
  })
  const [dateStatus, onChange] = useState([new Date(), new Date()]);
  const [currency, setCurrency] = React.useState('EUR');
  const [city, setCity] = React.useState("")
  const handleCurrencyChange = event => {
    setCurrency(event.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault()
    const diffTime = Math.abs(dateStatus[0] - dateStatus[1]);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    const formData = {
      days: diffDays,
      budget: 100,
      number: 2,
      city: city,
    }
    console.log(formData);
    socket.emit("query", formData)
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
      <MyContainerGrid>
        <MyTextField str="budget-per-person" />
        <MyTextField str="city" />
        <TextField
          id="outlined-select-group-size"
          select
          label="Group size"
          helperText="Number of travellers"
          style={{ minHeight: '10vh' }}
        >
          {[...Array(6)].map((_, i) => i).map(value => (
            < MenuItem key={"key-" + value} value={value}>
              {value}
            </MenuItem>
          ))}
        </TextField>
        <DateRangePicker
          fontFamily={"sans-serif"}
          value={dateStatus}
          onChange={onChange}
          style={{ minHeight: '10vh' }}
        />
        <TextField
          id="outlined-select-currency"
          select
          label="Select"
          value={currency}
          onChange={handleCurrencyChange}
          helperText="Please select your currency"
          style={{ minHeight: '10vh' }}
        >
          {currencies.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
      </MyContainerGrid>
      <MyContainerGrid>
        <ButtonGroup variant='contained' aria-label="outlined primary button group" >
          <MyButton name={"submit"} />
          <MyButton name={"reset"} />
        </ButtonGroup>
      </MyContainerGrid>
    </Paper>
  </Box >
}

function MyContainerGrid({ children }) {
  return <Grid
    container
    spacing={0}
    direction="column"
    alignItems="center"
    justifyContent="center"
    style={{ minHeight: '10vh' }}
  >
    {children}
  </Grid>
}

function MyTextField({ str, variant = TEXTFIELD_LABELS.OUTLINED }) {
  const wordsArray = str.split("-");
  const normalizedArray = wordsArray.map(word => {
    return word[0].toUpperCase() + word.substring(1).toLowerCase();
  })
  const label = normalizedArray.join(" ");
  return <TextField
    id={str}
    label={label}
    variant={variant}
    style={{ minHeight: '10vh' }}
  />
}

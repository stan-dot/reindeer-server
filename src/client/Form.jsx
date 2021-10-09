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

// TODO add more https://www.nhs.uk/conditions/travel-vaccinations/jabs/
const vaccinations = [
  {
    value: 'COVID-EU',
    label: 'COVID-EU',
  },
  {
    value: 'COVID-UK',
    label: 'COVID-UK'
  },
  {
    value: 'tuberculosis',
    lable: 'Tuberculosis'
  }
]

const languages = [
  {
    value: 'english',
    label: 'English'
  },
  {
    value: 'spanish',
    label: 'Spanish'
  },
  {
    value: 'arabic',
    label: 'Arabic'
  }
]

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
 * city
 * time
  TODO add adornment icons https://codesandbox.io/s/kkx7n?file=/demo.js
 * vaccination status
 * language
 * @returns 
 */
export default function Form() {
  const socket = io()
  socket.on("data", data => {
  })
  const [value, onChange] = useState([new Date(), new Date()]);
  const [currency, setCurrency] = React.useState('EUR');
  const [vaccination, setVaccinaton] = React.useState('COVID-UK');
  const [language, setLanguage] = React.useState('English');
  const handleLanguageChange = event => {
    setLanguage(event.target.value);
  }
  const handleVaccineChange = event => {
    setVaccinaton(event.target.value)
  }
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
      <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justifyContent="center"
        style={{ minHeight: '10vh' }}
      >
        <MyTextField str="hotel-stars " />
        <MyTextField str="budget-per-person" />
        <MyTextField str="city" />
        <TextField
          id="outlined-select-currency"
          select
          label="Vaccination"
          value={vaccination}
          onChange={handleVaccineChange}
          helperText="Please select your vaccine"
          style={{ minHeight: '10vh' }}
        >
          {vaccinations.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          id="outlined-select-language"
          select
          label="Language"
          value={language}
          onChange={handleLanguageChange}
          helperText="Choose language you'd like to practice on this trip"
          style={{ minHeight: '10vh' }}
        >
          {languages.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
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
          value={value}
          onChange={onChange}
          style={{ minHeight: '10vh' }}
        />
        <TextField
          id="outlined-select-currency"
          select
          label="Select"
          value={currency}
          onChange={handleChange}
          helperText="Please select your currency"
          style={{ minHeight: '10vh' }}
        >
          {currencies.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
      </Grid>
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
    </Paper>
  </Box >
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

function MySelectField({ str, variant = TEXTFIELD_LABELS.OUTLINED, ...options }) {
  const wordsArray = str.split("-");
  const normalizedArray = wordsArray.map(word => {
    return word[0].toUpperCase() + word.substring(1).toLowerCase();
  })
  const label = normalizedArray.join(" ");
  return <TextField
    id={str}
    label={label}
    variant={variant}
    style={{ minHeight: '10vh', padding: '10px' }}
    select
  />
}
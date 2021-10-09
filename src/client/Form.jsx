import { Button, Paper } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import MenuItem from '@material-ui/core/MenuItem';
import * as React from 'react';
import { useState } from 'react';
import DateRangePicker from '@wojtekmaj/react-daterange-picker';
import { io } from 'socket.io-client';
import { MyButton } from './helpers/Elements';
import { currencies } from './helpers/currencies';
import { MyContainerGrid, MyTextField } from './MyContainerGrid';

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
  const [dateStatus, onDateChange] = useState([new Date(), new Date()]);
  const [number, setNumber] = useState(1);
  const [budget, setBudget] = useState(1000);
  const [currency, setCurrency] = useState('EUR');
  const [city, setCity] = useState("");

  const reset = () => {
    onDateChange([new Date(), new Date()]);
    setCurrency('EUR');
    setCity('');
  }

  const handleSubmit = e => {
    e.preventDefault()
    resetForm();
  };

  const resetForm = () => {
    const diffTime = Math.abs(dateStatus[0] - dateStatus[1]);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    const formData = {
      days: diffDays,
      budget: budget,
      number: number,
      city: city,
    }
    console.log(formData);
    socket.emit("query", formData)
  }

  return <Box
    component="form"
    sx={{ '& > :not(style)': { m: 1, width: '25ch' } }}
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
          onChange={onDateChange}
          style={{ minHeight: '10vh' }}
        />
        <TextField
          id="outlined-select-currency"
          select
          label="Select"
          value={currency}
          onChange={setCurrency}
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



import { Grid } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import * as React from 'react';
import { TEXTFIELD_LABELS } from './currencies';

export function MyContainerGrid({ children }) {
  return <Grid
    container
    spacing={0}
    direction="column"
    alignItems="center"
    justifyContent="center"
    style={{ minHeight: '10vh' }}
  >
    {children}
  </Grid>;
}
export function MyTextField({ str, variant = TEXTFIELD_LABELS.OUTLINED }) {
  const wordsArray = str.split("-");
  const normalizedArray = wordsArray.map(word => {
    return word[0].toUpperCase() + word.substring(1).toLowerCase();
  });
  const label = normalizedArray.join(" ");
  return <TextField
    id={str}
    label={label}
    variant={variant}
    style={{ minHeight: '10vh' }} />;
}

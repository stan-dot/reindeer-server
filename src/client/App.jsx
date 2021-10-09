import { Button, Grid, Paper } from '@material-ui/core';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import React from 'react';
import './App.css';
import Form from './Form';
import frame from './img/reindeer-frame.jpg';
import ReindeerImg from './ReindeerImg';
import Results from './Results';

import SearchIcon from '@mui/icons-material/Search';
// https://unsplash.com/photos/mSaa5BVUoY8 source of the photo
// https://fonts.google.com/specimen/Bungee+Inline?category=Display#about the font
// TODO https://github.com/mui-org/material-ui/blob/next/docs/src/pages/getting-started/templates/album/Album.js
// TODO https://www.jamestharpe.com/react-visjs/
export default function App() {
  const [hasSearched, toggleHasSearched] = React.useState(false);
  return <div className="App">
    <ReindeerImg name={frame} />
    <AppBar position="static">
      <Toolbar className="App-header"
        color="inherit">
        <Button ><SearchIcon /> search again</Button>
      </Toolbar>
    </AppBar>
    <Paper elevation={2}>
      <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justifyContent="center"
        style={{ minHeight: '100vh' }}
      >
        <Grid item xs={3}>
          <Form />
          <Paper elevation={6}>
            <Results />
          </Paper>
        </Grid>
      </Grid></Paper>
  </div >
}

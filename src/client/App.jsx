import { Button, Grid, Paper } from '@material-ui/core';
import { ImageList , } from '@mui/material';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import React from 'react';
import './App.css';
import Form from './Form';
import frame from './img/reindeer-frame.jpg';
import ReindeerImg from './helpers/ReindeerImg';
import Results from './Results';
import { MyContainerGrid } from './helpers/MyContainerGrid';
// https://unsplash.com/photos/mSaa5BVUoY8 source of the photo
// https://fonts.google.com/specimen/Bungee+Inline?category=Display#about the font
export default function App() {
  return <div className="App">
    <ImageList
      sx={{ width: 500, height: 350 }}
      variant="woven"
      cols={3}
      rowHeight={350}
    >
      <ReindeerImg name={frame} />
      <ReindeerImg name={frame} />
      <ReindeerImg name={frame} />
      <ReindeerImg name={frame} />
      <ReindeerImg name={frame} />
      <ReindeerImg name={frame} />
      <ReindeerImg name={frame} />
    </ImageList>
    <AppBar position="static">
      <Toolbar className="App-header" color="inherit">
        <Button > search again</Button>
      </Toolbar>
    </AppBar>
    <Paper elevation={2}>
      <MyContainerGrid>
        <Grid item xs={3}>
          <Form />
        </Grid>
        <Grid item xs={3}>
          <Paper elevation={6}>
            <Results />
          </Paper>
        </Grid>
      </MyContainerGrid>
    </Paper>
  </div >
}

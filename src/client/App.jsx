import { Grid } from '@material-ui/core';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import React from 'react';
import './App.css';
import Centering4Ways from './Centering4Ways';
import { IMG_DIMENSIONS } from './Constants';
import Form from './Form';
import zoom from './img/reindeer-zoom.jpg';
import reindeer from './img/reindeer.jpg';
import Results from './Results';

// https://unsplash.com/photos/mSaa5BVUoY8 source of the photo
// https://fonts.google.com/specimen/Bungee+Inline?category=Display#about the font
// TODO https://github.com/mui-org/material-ui/blob/next/docs/src/pages/getting-started/templates/album/Album.js
// TODO https://www.jamestharpe.com/react-visjs/
export default function App() {
  return <div className="App">
    <img
      src={reindeer}
      rel="reindeer"
      href="%PUBLIC_URL%/reindeer.jpg"
      alt='reindeer background'
      height={IMG_DIMENSIONS.HEIGHT}
      width={IMG_DIMENSIONS.WIDTH}
    />
    <AppBar position="static"
    >
      <Toolbar className="App-header"
        color="inherit">
      </Toolbar>
      <img
        src={zoom}
        rel="reindeer-zoom"
        href="%PUBLIC_URL%/reindeer-zoom.jpg"
        alt='reindeer zoom'
        height={IMG_DIMENSIONS.HEIGHT / 3}
        width={IMG_DIMENSIONS.WIDTH / 4}
      />
    </AppBar>
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
        <Results />
        <Centering4Ways />
      </Grid>
    </Grid>

  </div >
}

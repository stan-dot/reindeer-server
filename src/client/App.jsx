import reindeer from './reindeer.jpg'
import './App.css';
import Results from './Results';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Form from './Form';

const IMG_DIMENSIONS = {
  WIDTH: 600,
  HEIGHT: 400
}

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
      color='#800020'
    >
      <Toolbar className="App-header"
        color="inherit">
      </Toolbar>
    </AppBar>
    <Form />
    <Results />
  </div >
}

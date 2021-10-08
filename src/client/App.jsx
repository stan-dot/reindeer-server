import reindeer from './reindeer.jpg'
import logo from './logo.svg';
import './App.css';
import Results from './Results';
import Button from '@material-ui/core/Button';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import { Paper } from '@material-ui/core';
import Form from './Form';

const IMG_DIMENSIONS = {
  WIDTH: 400,
  HEIGHT: 400
}
// https://unsplash.com/photos/mSaa5BVUoY8 source of the photo
export default function App() {
  return <div className="App">
    <img
      src={reindeer}
      rel="reindeer"
      href="%PUBLIC_URL%/reindeer.jpg"
      alt='reindeer background image'
      height={IMG_DIMENSIONS.HEIGHT}
      width={IMG_DIMENSIONS.WIDTH}
    />
    <AppBar position="static">
      <Toolbar className="App-header">
        <p>
        </p>
        <Button variant="contained">Hello World</Button>
      </Toolbar>
    </AppBar>
    <Paper>
      <Form />
    </Paper>
    <Paper>
      <Results />
    </Paper>
  </div >
}

import logo from './logo.svg';
import './App.css';
import Results from './Results';
import Button from '@material-ui/core/Button';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import { Paper } from '@material-ui/core';
import Form from './Form';

export default function App() {
  return <div className="App">
    <AppBar position="static">
      <Toolbar className="App-header">
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <Button variant="contained">Hello World</Button>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </Toolbar>
    </AppBar>
    <Paper>
      <Form />
    </Paper>
    <Paper>
      <Results/>
    </Paper>
  </div >
}

//import logo from './logo.svg';
import './App.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faCloudSun, faSync, faMoon} from '@fortawesome/free-solid-svg-icons'
import {BrowserRouter as Router, Switch, Route, Link} from 'react-router-dom';
import {Nav, Navbar, Form, FormControl, Button} from 'react-bootstrap';
import { useState } from 'react';
import axios from 'axios';
import moment from 'moment';

import Landing from './components/landing';
import Forecast from './components/forecast';

const dotenv = require('dotenv');
dotenv.config();
const key = process.env.REACT_APP_OWM_API_KEY;

const App = () => {

  const [zip, setZip] = useState('');
  const [currentData, setCurrentData] = useState(null);
  const [forecastData, setForecastData] = useState(null);
  const [date, setDate] = useState(moment().calendar());
  const [darkMode, setDarkMode] = useState(false);

  const changeHandler = (e) => {
    e.preventDefault();
    setZip(e.target.value);
    console.log(zip);
  }

  const themeHandler = (e) => {
    e.preventDefault();
    setDarkMode(!darkMode);

    !darkMode ? document.body.className = 'dark' : document.body.className = '';
  }

  const fetchData = async () => {
    const current = await axios(`https://api.openweathermap.org/data/2.5/weather?zip=${zip},us&appid=${key}&lang=en&units=imperial`);
    const forecast = await axios(`https://api.openweathermap.org/data/2.5/forecast?zip=${zip},us&appid=${key}&lang=en&units=imperial&`);

    setCurrentData(current.data);
    setForecastData(forecast.data);
  }

  const submitHandler = (e) => {
    e.preventDefault();
    fetchData();
    setDate(moment().calendar());
    console.log("Current", currentData);
    console.log("Forecast", forecastData);
    document.getElementById('input').value = '';
  }

  window.onload = () => {
    axios(`https://api.openweathermap.org/data/2.5/weather?zip=${10001},us&appid=${key}&lang=en&units=imperial`)
      .then(res => setCurrentData(res.data));

      axios(`https://api.openweathermap.org/data/2.5/forecast?zip=${10001},us&appid=${key}&lang=en&units=imperial&`)
        .then(res => setForecastData(res.data));
  }

  return(
    <Router>
      <Navbar bg="light" variant="light">
        <Navbar.Brand as={Link} to='/' title='simplWeather'><FontAwesomeIcon icon={faCloudSun}/></Navbar.Brand>
        <Nav className="mr-auto">
          <Nav.Link as={Link} to='/forecast' className='disabled'>Forecast</Nav.Link>
        </Nav>
        <Form inline onSubmit={submitHandler} className=''>
          <FormControl type="text" id='input' placeholder="Enter Zip..." className="mr-sm-2" name='zipcode' onChange={e => changeHandler(e)} autoComplete='off'/>
        </Form>
        <Button className='bg-info mx-1' type='button' onClick={submitHandler}><FontAwesomeIcon icon={faSync}/></Button>
        <Button className='bg-info' type='button' onClick={themeHandler}><FontAwesomeIcon icon={faMoon}/></Button>
      </Navbar>

      <Switch>
        <Route exact path='/'>
          <Landing data={currentData} dateStr={date}/>
        </Route>

        <Route path='/forecast'>
          <Forecast/>
        </Route>
      </Switch>
    </Router>
  )
}

export default App;

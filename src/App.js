import logo from './logo.svg';
import './App.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faCloudSun, faSearch} from '@fortawesome/free-solid-svg-icons'
import {BrowserRouter as Router, Switch, Route, Link} from 'react-router-dom';
import {Nav, Navbar, Form, FormControl, Button} from 'react-bootstrap';
import { useState } from 'react';
import axios from 'axios';

import Landing from './components/landing';
import Forecast from './components/forecast';

const dotenv = require('dotenv');
dotenv.config();
const key = process.env.REACT_APP_OWM_API_KEY;

const App = () => {

  const [zip, setZip] = useState('');
  const [currentData, setCurrentData] = useState(null);
  const [forecastData, setForecastData] = useState(null);

  const changeHandler = (e) => {
    e.preventDefault();
    setZip(e.target.value);
    console.log(zip);
  }

  const fetchData = async () => {
    const current = await axios(`https://api.openweathermap.org/data/2.5/weather?zip=${zip},us&appid=${key}&lang=en&units=imperial`);
    const forecast = await axios(`https://api.openweathermap.org/data/2.5/forecast?zip=${zip},us&appid=${key}&lang=en&units=imperial&`);

    setCurrentData(current.data);
    setForecastData(forecast.data);
  }

  const submitHandler = (e) => {
    e.preventDefault();
    /*axios(`https://api.openweathermap.org/data/2.5/weather?zip=${zip},us&appid=${key}&lang=en&units=imperial`)
      .then(res => {
        const dataRes = res.data;
        setCurrentData(dataRes);
        //console.log(res.data);
        console.log(currentData, zip);
        return res.data;
      })*/

      fetchData();
      console.log("Current", currentData);
      console.log("Forecast", forecastData);
  }

  window.onload = () => {
    /*const current = await axios(`https://api.openweathermap.org/data/2.5/weather?zip=${10001},us&appid=${key}&lang=en&units=imperial`);
    const forecast = await axios(`https://api.openweathermap.org/data/2.5/forecast?zip=${10001},us&appid=${key}&lang=en&units=imperial&`);

    setCurrentData(current.data);
    setForecastData(forecast.data);*/
    fetchData();
    console.log(currentData, forecastData);
  }

  return(
    <Router>
      <Navbar bg="light" variant="light">
        <Navbar.Brand as={Link} to='/' title='simplWeather'><FontAwesomeIcon icon={faCloudSun}/></Navbar.Brand>
        <Nav className="mr-auto">
          <Nav.Link as={Link} to='/forecast'>Forecast</Nav.Link>
        </Nav>
        <Form inline onSubmit={submitHandler}>
          <FormControl type="text" placeholder="Enter Zip Code" className="mr-sm-2" name='zipcode' onChange={e => changeHandler(e)} autoComplete='off'/>
        </Form>
      </Navbar>

      <Switch>
        <Route exact path='/'>
          <Landing/>
        </Route>

        <Route path='/forecast'>
          <Forecast/>
        </Route>
      </Switch>
    </Router>
  )
}

export default App;

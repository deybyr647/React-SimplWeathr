import './App.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faCloudSun, faSync, faMoon} from '@fortawesome/free-solid-svg-icons'

import {BrowserRouter as Router, Switch, Route, Link} from 'react-router-dom';
import {Nav, Navbar, Form, FormControl, Button} from 'react-bootstrap';
import { lazy, Suspense, useState } from 'react';

import axios from 'axios';
import moment from 'moment';

import {Loader, Message} from './util';

const Landing = lazy(() => import('./components/landing'));
const Forecast = lazy(() => import('./components/forecast'));

const dotenv = require('dotenv');
dotenv.config();

const weatherKey = process.env.REACT_APP_OWM_API_KEY;
const geocodeKey = process.env.REACT_APP_GMAPS_GEOCODE_API_KEY;

const App = () => {
  const [zip, setZip] = useState(null);
  const [currentData, setCurrentData] = useState(null);
  const [forecastData, setForecastData] = useState(null);
  const [city, setCity] = useState(null);

  const [date, setDate] = useState(moment().calendar());
  const [darkMode, setDarkMode] = useState(false);
  const [coords, setCoords] = useState({lat: null, lng: null});

  const changeHandler = (e) => {
    e.preventDefault();
    setZip(e.target.value);
  }

  const themeHandler = (e) => {
    e.preventDefault();
    setDarkMode(!darkMode);
    !darkMode ? document.body.className = 'dark' : document.body.className = '';
  }

  const fetchData = async (c = coords, z = zip) => {
    const coordinates = await axios(`https://maps.googleapis.com/maps/api/geocode/json?&address=${z}&key=${geocodeKey}`);
    const current = await axios(`https://api.openweathermap.org/data/2.5/weather?zip=${z},us&appid=${weatherKey}&lang=en&units=imperial`);
    const forecast = await axios(`https://api.openweathermap.org/data/2.5/onecall?lat=${c.lat}&lon=${c.lng}&lang=en&units=imperial&exclude=current,minutely,hourly,alerts&appid=${weatherKey}`);
    
    setCoords(() => {
      return(
        {lat: coordinates.data.results[0].geometry.location.lat, lng: coordinates.data.results[0].geometry.location.lng}
      )
    });

    setCurrentData(() => current.data);
    setCity(() => current.data.name);
    setForecastData(() => forecast.data.daily);
  }

  const submitHandler = (e) => {
    e.preventDefault();
    fetchData();
    setDate(moment().calendar());
    document.getElementById('input').value = '';
  }

  window.onload = () => fetchData({lat: 40.75, lng: -74}, 10001);

  return(
    <Router>
      <Navbar bg="light" variant="light">
        <Navbar.Brand as={Link} to='/' title='simplWeather'><FontAwesomeIcon icon={faCloudSun}/></Navbar.Brand>
        <Nav className="mr-auto">
          <Nav.Link as={Link} to='/forecast' className=''>Forecast</Nav.Link>
        </Nav>
        <Form inline onSubmit={submitHandler} className=''>
          <FormControl type="text" id='input' placeholder="Enter Zip..." className="mr-sm-2" name='zipcode' onChange={e => changeHandler(e)} autoComplete='off'/>
        </Form>
        <Button className='bg-info mx-1' type='button' onClick={submitHandler}><FontAwesomeIcon icon={faSync}/></Button>
        <Button className='bg-info' type='button' onClick={themeHandler}><FontAwesomeIcon icon={faMoon}/></Button>
      </Navbar>

      <Message title='Welcome To SimplWeather' text='Enter a Zip Code To Get Started...' ver='primary'/>

      <Switch>
        <Route exact path='/'>
          <Message title='Showing Current Weather Data For...' text={city} ver='secondary'/>

          <Suspense fallback={Loader}>
            <Landing data={currentData} dateStr={date}/>
          </Suspense>

        </Route>

        <Route path='/forecast'>
          <Message title='Showing Forecast Weather Data For...' text={city} ver='secondary'/>

          <Suspense fallback={Loader}>
            <Forecast data={forecastData} dateStr={date}/>
          </Suspense>

        </Route>
      </Switch>
    </Router>
  )
}

export default App;

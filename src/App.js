import logo from './logo.svg';
import './App.css';
import {getCurrentWeather, getWeatherForecast} from './weather';

import {BrowserRouter as Router, Switch, Route, Link} from 'react-router-dom';
import {Nav, Navbar, Form, FormControl, Button} from 'react-bootstrap';
import { useState } from 'react';

//getCurrentWeather();
//getWeatherForecast();

const App = () => {

  const [zip, setZip] = useState('');

  const changeHandler = (e) => {
    e.preventDefault();

    const {name, value} = e.currentTarget;

    name === 'zipcode' ? setZip(value) : console.error("Error!");

    console.log(zip);
  }

  const submitHandler = (e) => {
    e.preventDefault();
    getCurrentWeather(zip);
  }

  return(
    <Router>
      <Navbar bg="light" variant="light">
        <Navbar.Brand as={Link} to='/'>Navbar</Navbar.Brand>
        <Nav className="mr-auto">
          <Nav.Link as={Link} to='/forecast'>Daily Forecast</Nav.Link>
        </Nav>
        <Form inline onSubmit={submitHandler}>
          <FormControl type="text" placeholder="Enter Zip Code" className="mr-sm-2" name='zipcode' onChange={e => changeHandler(e)} autoComplete='off'/>
          <Button type='button' variant="outline-primary" onClick={submitHandler}>Search</Button>
        </Form>
      </Navbar>
    </Router>
  )
}

export default App;

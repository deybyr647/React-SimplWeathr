import './landing.css';
import { useState } from 'react';
import {Container, Row, Col, Card, Jumbotron, Alert, ListGroup, ListGroupItem, Image} from 'react-bootstrap';

import {capitalizeStr} from '../../util';

const LandingMessage = () => {
    const [alert, setAlert] = useState(true);

    return(
        <Row as={Alert} className='justify-content-center mx-auto'>
            <Col>
                <Alert variant='primary' show={alert} className='text-left' dismissible onClose={() => setAlert(false)}>
                    <Alert.Heading>Welcome To SimplWeather</Alert.Heading>
                    <p>Enter a zip code to get started...</p>
                </Alert>
            </Col>
        </Row>
    )
}

const CurrentWeather = ({weatherObj, date}) => {
    return(
        <Row className='justify-content-center'>
            <Col xs={11} lg={5} xl={6} >
                <Jumbotron>
                    <h3 className='text-center pb-3'>{weatherObj.name}</h3>

                    <Card className='rounded text-center'>
                        <Image width='40%' src={`https://openweathermap.org/img/wn/${weatherObj.weather[0].icon}@2x.png`} className='mx-auto'/>
                        <Card.Body>
                            <Card.Title>{capitalizeStr(weatherObj.weather[0].description)}</Card.Title>

                            <ListGroup className='list-group-flush'>
                                <ListGroupItem>{parseInt(weatherObj.main.temp)} &deg;</ListGroupItem>
                                <ListGroupItem>Feels Like {parseInt(weatherObj.main.feels_like)} &deg;</ListGroupItem>
                                <ListGroupItem>Humidity: {weatherObj.main.humidity}%</ListGroupItem>
                                <ListGroupItem>Pressure: {weatherObj.main.pressure} hPa</ListGroupItem>
                                <ListGroupItem>Max: {parseInt(weatherObj.main.temp_max)} &deg;</ListGroupItem>
                                <ListGroupItem>Min: {parseInt(weatherObj.main.temp_min)} &deg;</ListGroupItem>
                            </ListGroup>

                            <Card.Footer>Updated {date}</Card.Footer>
                        </Card.Body>
                    </Card>
                </Jumbotron>
            </Col>
        </Row>
    )
}

const Loader = () => {
    return(
        <Row className='justify-content-center mx-auto'>
            <Col>
                <Jumbotron fluid>
                    <Container className='loader'></Container>
                </Jumbotron>
            </Col>
        </Row>
    )
}

const Landing = ({data, dateStr}) => {
    return(
        <Container>
            <LandingMessage/>
            {data ? <CurrentWeather date={dateStr} weatherObj={data}/> : <Loader/>}
        </Container>
    )
}

export default Landing;
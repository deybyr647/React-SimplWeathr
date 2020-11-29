import './landing.css';
import {Container, Row, Col, Card, Jumbotron, ListGroup, ListGroupItem, Image} from 'react-bootstrap';

import {capitalizeStr} from '../../util';

const CurrentWeather = ({weatherObj, date}) => {
    return(
        <Row className='justify-content-center'>
            <Col xs={11} lg={5} xl={6} >
                <Jumbotron>
                    <Card className='rounded text-center'>
                        <Image width='40%' src={`https://openweathermap.org/img/wn/${weatherObj.weather[0].icon}@2x.png`} className='mx-auto'/>
                        <Card.Body>
                            <Card.Title>{capitalizeStr(weatherObj.weather[0].description)}</Card.Title>

                            <ListGroup className='list-group-flush'>
                                <ListGroupItem>Currently {parseInt(weatherObj.main.temp)} &deg;</ListGroupItem>
                                <ListGroupItem>Feels Like {parseInt(weatherObj.main.feels_like)} &deg;</ListGroupItem>
                                <ListGroupItem>Humidity: {weatherObj.main.humidity} %</ListGroupItem>
                                <ListGroupItem>Pressure: {weatherObj.main.pressure} hPa</ListGroupItem>
                                <ListGroupItem>Max: {parseInt(weatherObj.main.temp_max)} &deg;</ListGroupItem>
                                <ListGroupItem>Min: {parseInt(weatherObj.main.temp_min)} &deg;</ListGroupItem>
                            </ListGroup>

                            <Card.Footer className='bg-info'>Updated {date}</Card.Footer>
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
            {data ? <CurrentWeather date={dateStr} weatherObj={data}/> : <Loader/>}
        </Container>
    )
}

export default Landing;
export {Loader};
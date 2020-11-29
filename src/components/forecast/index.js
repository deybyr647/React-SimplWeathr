import './forecast.css'
import {Carousel, Image, Card, ListGroup, Container, Col, Row, ListGroupItem, Jumbotron} from 'react-bootstrap';
import {Loader} from '../landing'
import {capitalizeStr, timeConverter} from '../../util';

const DayForecastItem = ({weatherObj}) => {
    return(
        <Card className='rounded text-center'>
            <Image width='40%' src={`https://openweathermap.org/img/wn/${weatherObj.weather[0].icon}@2x.png`} className='mx-auto'/>
            <Card.Body>
                <Card.Title>{capitalizeStr(weatherObj.weather[0].description)}</Card.Title>

                <ListGroup className='list-group-flush'>
                    <ListGroupItem>Currently &deg;</ListGroupItem>
                    <ListGroupItem>Feels Like  &deg;</ListGroupItem>
                    <ListGroupItem>Humidity: {weatherObj.humidity} %</ListGroupItem>
                    <ListGroupItem>Pressure: {weatherObj.pressure} hPa</ListGroupItem>
                    <ListGroupItem>Max: {parseInt(weatherObj.temp.max)} &deg;</ListGroupItem>
                    <ListGroupItem>Min: {parseInt(weatherObj.temp.min)} &deg;</ListGroupItem>
                </ListGroup>

                <Card.Footer className='bg-secondary text-white'>{timeConverter(weatherObj.dt)}</Card.Footer>
            </Card.Body>
        </Card>
    )
}

const Slideshow = ({dataArr}) => {
    return(
        <Row className='justify-content-center'>
            <Col xs={11} lg={5} xl={6}>
                <Jumbotron>
                    <Carousel>
                        {dataArr.map((el, ndx) => <Carousel.Item key={ndx}><DayForecastItem weatherObj={el}/></Carousel.Item>)}
                    </Carousel>
                </Jumbotron>
            </Col>
        </Row>
    )
}

const Forecast = ({data, dateStr}) => {
    return(
        <Container className='mt-5 pt-5'>
            {data ? <Slideshow dataArr={data}></Slideshow> : <Loader/>}
        </Container>
    )
}

export default Forecast;
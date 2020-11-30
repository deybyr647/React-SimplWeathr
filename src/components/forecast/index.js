import {Carousel, Image, Card, ListGroup, Container, Col, Row, ListGroupItem, Jumbotron} from 'react-bootstrap';
import {capitalizeStr, timeConverter, Loader, getAverageFromObj} from '../../util';

const DayForecastItem = ({weatherObj}) => {
    return(
        <Card className='rounded text-center'>
            <Image width='40%' src={`https://openweathermap.org/img/wn/${weatherObj.weather[0].icon}@2x.png`} className='mx-auto'/>
            <Card.Body>
                <Card.Title>{capitalizeStr(weatherObj.weather[0].description)}</Card.Title>

                <ListGroup className='list-group-flush'>
                    <ListGroupItem>Avg. Temp {getAverageFromObj(weatherObj.temp)} &deg;</ListGroupItem>
                    <ListGroupItem>Avg. Feels Like {getAverageFromObj(weatherObj.feels_like)} &deg;</ListGroupItem>
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

const Forecast = ({data}) => {
    return(
        <Container>
            {data ? <Slideshow dataArr={data}/> : <Loader/>}
        </Container>
    )
}

export default Forecast;
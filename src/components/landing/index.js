import { useState } from 'react';
import {Container, Row, Col, Card, Jumbotron, Alert, ListGroup, ListGroupItem} from 'react-bootstrap';

const LandingMessage = () => {
    const [alert, setAlert] = useState(true);

    return(
        <Row as={Alert}>
            <Col>
                <Alert variant='primary' show={alert} dismissible onClose={() => setAlert(false)}>
                    <Alert.Heading>Welcome To SimplWeather</Alert.Heading>
                    <p>Enter a zip code to get started...</p>
                </Alert>
            </Col>
        </Row>
    )
}

const CurrentWeather = ({weatherObj}) => {
    return(
        <Row>
            <Col>
                <Jumbotron>
                    <h3 className='text-center'>City</h3>

                    <Card>
                        <Card.Img variant='top' src={null}/>
                        <Card.Body>
                            <Card.Title>Weather Desc</Card.Title>
                            <Card.Text>Lorem Ipsum</Card.Text>

                            <ListGroup className='list-group-flush'>
                                <ListGroupItem>Weather</ListGroupItem>
                                <ListGroupItem>Feels Like</ListGroupItem>
                                <ListGroupItem>Humidity</ListGroupItem>
                                <ListGroupItem>Pressure</ListGroupItem>
                                <ListGroupItem>Max</ListGroupItem>
                                <ListGroupItem>Min</ListGroupItem>
                            </ListGroup>

                            <Card.Footer>Updated a minute ago</Card.Footer>
                        </Card.Body>
                    </Card>
                </Jumbotron>
            </Col>
        </Row>
    )
}

const Landing = ({data}) => {

    return(
        <Container>
            <LandingMessage/>
            <CurrentWeather/>
        </Container>
    )
}

export default Landing;
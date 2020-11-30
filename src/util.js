import { useState } from 'react';
import {Container, Row, Col, Jumbotron, Alert} from 'react-bootstrap';

const capitalizeStr = (str) => {
    let splitStr = str.toLowerCase().split(' ');

    for(let i = 0; i < splitStr.length; i++){
        splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
    }

    return splitStr.join(' ');
}

const timeConverter = (unixTimeStamp) => {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

    const d = new Date(unixTimeStamp * 1000);

    const year = d.getFullYear();
    const month = months[d.getMonth()];
    const date = d.getDate();

    const out = `${month} ${date} ${year}`;
    return out;
}

const getAverageFromObj = (obj) => {
    let count = 0;
    let amt = 0;
    
    //eslint-disable-next-line
    for(const [key, value] of Object.entries(obj)){
        count++;
        amt += value;
    }

    let avg = amt / count;

    return parseInt(avg);
}

const Loader = () => {
    return(
        <Container>
            <Row className='justify-content-center mx-auto'>
                <Col>
                    <Jumbotron fluid>
                        <Container className='loader'></Container>
                    </Jumbotron>
                </Col>
            </Row>
        </Container>
    )
}

const Message = ({title, text, ver}) => {
    const [alert, setAlert] = useState(true);
  
    return(
        <Row as={Alert} className='justify-content-center mx-auto my-0 py-0'>
            <Col>
                <Alert variant={ver} show={alert} className='text-left' dismissible onClose={() => setAlert(false)}>
                    <Alert.Heading>{title}</Alert.Heading>
                    <p>{text}</p>
                </Alert>
            </Col>
        </Row>
    )
  }

export {capitalizeStr, timeConverter, Loader, getAverageFromObj, Message};
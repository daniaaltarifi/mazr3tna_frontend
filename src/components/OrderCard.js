import React from 'react';
import { Card, Row, Col } from 'react-bootstrap';
import { useThemeHook } from '../GlobalComponents/ThemeProvider';

const OrderCard = (props) => {
    const [theme] = useThemeHook();
    return (
       <Card className={`${theme? 'bg-light-black text-light' : 'bg-light text-black'} mb-3`} border={theme? 'white' : 'black'}>
            <Card.Header>
                <small className="float-end">Order ID: {props.orderId}</small>
                <b>Date: {props.created_at}</b>
            </Card.Header>
            <Row className="p-2">
                <Col xs={3} sm={2}>
                    <Card.Img variant="top"height={"100%"} width={"100%"} src={props.img} className='object-fit-contain' />
                </Col>
                <Col>
                    <Card.Body>
                        <Card.Title>{props.title}</Card.Title>
                        {/* <Card.Text>
                            <Badge pill bg="success">
                                Delivered on {props.quantity}
                            </Badge>
                        </Card.Text> */}
                        <Card.Text>
                          Price: {props.price} JD
                        </Card.Text>
                        <Card.Text>
                          Quantity: {props.quantity} 
                        </Card.Text>
                    </Card.Body>
                </Col>
            </Row>
       </Card>
    );
};

export default OrderCard;
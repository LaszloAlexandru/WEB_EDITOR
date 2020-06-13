import React from 'react';

import './list-component.scss';
import {Button, ButtonGroup, Col, ListGroup, Row} from "react-bootstrap";
import {MdModeEdit, MdDeleteForever, MdPlayArrow} from 'react-icons/md';
/* eslint-disable-next-line */
export interface ListComponentProps {}


const dummyList = [
  {
    name:"test 1",
    timestamp: "Some date idk mate",
    active: false
  },
  {
    name:"test 1",
    timestamp: "Some date idk mate",
    active: false
  },
  {
    name:"test 1",
    timestamp: "Some date idk mate",
    active: false
  },
  {
    name:"test 1",
    timestamp: "Some date idk mate",
    active: false
  },
  {
    name:"test 1",
    timestamp: "Some date idk mate",
    active: false
  },
  {
    name:"test 1",
    timestamp: "Some date idk mate",
    active: false
  },
  {
    name:"test 1",
    timestamp: "Some date idk mate",
    active: false
  },
  {
    name:"test 1",
    timestamp: "Some date idk mate",
    active: false
  },
  {
    name:"test 1",
    timestamp: "Some date idk mate",
    active: false
  },
  {
    name:"test 1",
    timestamp: "Some date idk mate",
    active: false
  },
  {
    name:"test 1",
    timestamp: "Some date idk mate",
    active: false
  },
  {
    name:"test 1",
    timestamp: "Some date idk mate",
    active: false
  },  {
    name:"test 1",
    timestamp: "Some date idk mate",
    active: false
  },
  {
    name:"test 1",
    timestamp: "Some date idk mate",
    active: false
  },
  {
    name:"test 1",
    timestamp: "Some date idk mate",
    active: false
  },
  {
    name:"test 1",
    timestamp: "Some date idk mate",
    active: false
  },
  {
    name:"test 1",
    timestamp: "Some date idk mate",
    active: false
  },
  {
    name:"test 1",
    timestamp: "Some date idk mate",
    active: false
  },  {
    name:"test 1",
    timestamp: "Some date idk mate",
    active: false
  },
  {
    name:"test 1",
    timestamp: "Some date idk mate",
    active: false
  },
  {
    name:"test 1",
    timestamp: "Some date idk mate",
    active: false
  },
  {
    name:"test 1",
    timestamp: "Some date idk mate",
    active: false
  },
  {
    name:"test 1",
    timestamp: "Some date idk mate",
    active: false
  },
  {
    name:"test 1",
    timestamp: "Some date idk mate",
    active: false
  },
];

export const ListComponent = (props: ListComponentProps) => {


  const getListItems = () => {
    return dummyList.map((design,index) => {
      return (
        <ListGroup.Item key={index} variant="light">
          <Row className='list-item-row'>
            <Col xs={4} >
              {design.name}
            </Col>
            <Col >
              {design.timestamp}
            </Col>
            <Col >
              FireFox
            </Col>
            <Col className="design-buttons ">
              <ButtonGroup aria-label="Basic example">
                <Button variant="primary" className='design-button'>
                  <span>Activate</span>
                  <span className='design-buttons-icons'>
                    <MdPlayArrow/>
                  </span>
                </Button>
                <Button variant="primary" className='design-button'>
                  <span>Edit</span>
                  <span className='design-buttons-icons'>
                    <MdModeEdit/>
                  </span>
                </Button>
                <Button variant="primary" className='design-button'>
                  <span>Delete</span>
                  <span className='design-buttons-icons'>
                    <MdDeleteForever/>
                  </span>
                </Button>
              </ButtonGroup>
            </Col>
          </Row>
        </ListGroup.Item>
        )
    });
  };

  const listItems = getListItems();

  return (
    <ListGroup>
      {listItems}
    </ListGroup>
  );
};

export default ListComponent;

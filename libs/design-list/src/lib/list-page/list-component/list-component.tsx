import React, {useState} from 'react';

import './list-component.scss';
import {Button, ButtonGroup, Col, ListGroup, Row} from "react-bootstrap";
import {MdModeEdit, MdDeleteForever, MdPlayArrow} from 'react-icons/md';
import axios from "axios";
import Cookies from "universal-cookie";
import {environment} from "../../../../../../apps/web-editor-client/src/environments/environment";

/* eslint-disable-next-line */
export interface ListComponentProps {
  filter:string;
}


export const ListComponent = (props: ListComponentProps) => {

  const [designList, setDesignList] = useState(null);
  const cookies = new Cookies();

  const getListData = async() => {
    const email = cookies.get("email");
    const url = environment.backEndEndpoint + 'design-crud/getDesigns?email=' + email
    const response = await axios.get(url)
      .then(res => {
        return res.data;
      })
    setDesignList(response);
  };
  if(designList == null){
     getListData();
    return (
      <div>Loading</div>
    )
  }

  const handleDelete = async (name: string) => {
    const email = cookies.get("email");
    const url = environment.backEndEndpoint + 'design-crud/addDesign';
    const response = await axios.delete(url, {
      data: {
        email,
        name
      }
    })
      .then(res => {
        return res.data;
      })
    setDesignList(response);
  }

  const activateDesign = async (name: string) => {
    const email = cookies.get("email");
    const url = environment.backEndEndpoint + "design-crud/activate?email=" + email + "&name=" + name;
    const encodedUrl = encodeURI(url);
    const response = await axios.put(encodedUrl)
      .then(res => {
        return res.data;
      });
    setDesignList(response);
  };

  const getListItems = () => {
    return designList.map((design,index) => {
      const activate = design.active ? "Deactivate" : "Activate";
      if(props.filter && props.filter !== '' && !design.name.includes(props.filter))
        return null;
      return (
        <ListGroup.Item key={index} variant="light" style={{padding: "0"}}>
          <Row className='list-item-row'>
            <Col xs={4} className='design-list-cell'>
              {design.name}
            </Col>
            <Col className='design-list-cell'>
              {design.timestamp}
            </Col>
            <Col className="design-buttons design-list-cell">
              <ButtonGroup aria-label="Basic example">
                <Button variant="primary" className='design-button' onClick={(e) => activateDesign(design.name)}>
                  <span>{activate}</span>
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
                <Button variant="primary" className='design-button' onClick={(e) => handleDelete(design.name)}>
                  <span>Delete</span>
                  <span className='design-buttons-icons '>
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
      <ListGroup.Item className="design-list-header" style={{padding: "0"}}>
        <Row className='list-item-row '>
          <Col xs={4} className='design-list-cell'>
            Design name
          </Col>
          <Col className='design-list-cell'>
            Date of creation
          </Col>
          <Col className='design-list-cell'>
            Controls
          </Col>
        </Row>
      </ListGroup.Item>
      {listItems}
    </ListGroup>
  );
};

export default ListComponent;

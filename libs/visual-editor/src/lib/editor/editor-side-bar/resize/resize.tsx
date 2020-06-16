import React, {useState} from 'react';

import './resize.scss';
import {Button, Form, Modal} from "react-bootstrap";
import _ from 'lodash';

/* eslint-disable-next-line */
export interface ResizeProps {
  path: string,
  addModification: (Modification) => void
}

export const Resize = (props: ResizeProps) => {
  const [show, setShow] = useState(false);
  const [width, setWidth] = useState(null);
  const [height, setHeight] = useState(null);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleSubmit = () => {
    const modification = {
      name: "Resize",
      path: props.path,
      value:  {
        width: width,
        height: height
      }
    };
    props.addModification(modification);
    const iFrame = document.getElementsByClassName("myClassname")[0];
    // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
    // @ts-ignore
    iFrame.contentWindow.postMessage({
      "path" : props.path,
      "type": "resizeModification",
      "resize": {
        width,
        height
      }
    }, "*");
    handleClose();
  };

  let debouncedFn = null;

  const handleWidthChange = (event) => {
    event.persist();
    if(!debouncedFn){
      debouncedFn =  _.debounce(() => {
        setWidth(event.target.value);
      }, 300);
    }

    debouncedFn();
  };


  const handleHeightChange = (event) => {
    event.persist();
    if(!debouncedFn){
      debouncedFn =  _.debounce(() => {
        setHeight(event.target.value);
      }, 300);
    }

    debouncedFn();
  };
  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Resize element
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Resize element</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="exampleForm.ControlTextarea1">
              <Form.Label>Width</Form.Label>
              <Form.Control as="input" onChange={handleWidthChange}/>
              <Form.Label>Height</Form.Label>
              <Form.Control as="input" onChange={handleHeightChange}/>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Resize;

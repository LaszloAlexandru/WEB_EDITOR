import React, {useState} from 'react';

import './background-change.scss';
import {Button, Modal} from "react-bootstrap";
import { SketchPicker } from 'react-color';

/* eslint-disable-next-line */
export interface BackgroundChangeProps {
  path:string
  addModification: (Modification) => void
}

export const BackgroundChange = (props: BackgroundChangeProps) => {
  const [show, setShow] = useState(false);
  const [color, setColor]: any = useState("");
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleChange = (newColor) => {
    setColor(newColor);
  };

  const handleBackgroundSubmit = (e) => {
    const modification = {
      name: "backgroundChange",
      type: "genericModification",
      path: props.path,
      value:  color.hex
    };
    props.addModification(modification);
    const iFrame = document.getElementsByClassName("myClassname")[0];
    // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
    // @ts-ignore
    iFrame.contentWindow.postMessage({
      "path" : props.path,
      "type": "background-change",
      "action": "click",
      "style": color.hex

    }, "*");

    handleClose();
  };

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Change background colour
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Choose a background colour</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <SketchPicker
            color={color}
            onChange={handleChange}
            className='color-picker'
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleBackgroundSubmit}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default BackgroundChange;

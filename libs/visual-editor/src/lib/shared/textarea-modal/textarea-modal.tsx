import React from 'react';

import './textarea-modal.scss';
import {Button, Form, Modal} from "react-bootstrap";

/* eslint-disable-next-line */
export interface TextareaModalProps {
  show: boolean;
  header: string;
  handleClose: () => void;
  handleChange: (any) => void;
  handleSubmit: () => void;
}

export const TextareaModal = (props: TextareaModalProps) => {
  const { show, header, handleClose, handleChange, handleSubmit}  = props;
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{header}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="exampleForm.ControlTextarea1">
            <Form.Control as="textarea" className='inject-javascript-textarea' onChange={handleChange}/>
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
  );
};


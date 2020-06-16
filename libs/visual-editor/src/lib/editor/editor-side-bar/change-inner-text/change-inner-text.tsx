import React, {useState} from 'react';

import './change-inner-text.scss';
import {Button} from "react-bootstrap";
import {TextareaModal} from "../../../shared/textarea-modal/textarea-modal";
import _ from 'lodash';
/* eslint-disable-next-line */
export interface ChangeInnerTexttProps {
  path:string;
  addModification: (Modification) => void;
}

export const ChangeInnerText = (props: ChangeInnerTexttProps) => {
  const [show, setShow] = useState(false);
  const [innerText, setInnerText] = useState(null);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleJsCodeSubmit = () => {
    const modification = {
      name: "textInjection",
      path: props.path,
      value:  innerText
    };
    props.addModification(modification);
    const iFrame = document.getElementsByClassName("myClassname")[0];
    // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
    // @ts-ignore
    iFrame.contentWindow.postMessage({
      "path" : props.path,
      "type": "inner-text-change",
      "action": "click",
      "text": innerText
    }, "*");
    handleClose();
  };

  let debouncedFn = null;

  const handleTextChange = (event) => {
    event.persist();
    if(!debouncedFn){
      debouncedFn =  _.debounce(() => {
        setInnerText(event.target.value);
      }, 300);
    }

    debouncedFn();
  };

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Change text
      </Button>

      <TextareaModal
        show={show}
        header={'Change inner text'}

        handleSubmit={handleJsCodeSubmit}
        handleChange={handleTextChange}
        handleClose={handleClose}
      />
    </>
  );
};

export default ChangeInnerText;

import React, {useState} from 'react';

import './inject-javascript.scss';
import {Button} from "react-bootstrap";
import _ from 'lodash';
import {TextareaModal} from "../../../shared/textarea-modal/textarea-modal";
/* eslint-disable-next-line */
export interface InjectJavascriptProps {
  path: string,
  addModification: (Modification) => void
}

export const InjectJavascript = (props: InjectJavascriptProps) => {
  const [show, setShow] = useState(false);
  const [jsCode, setJsCode] = useState(null);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleJsCodeSubmit = () => {
    const modification = {
      name: "jsModification",
      path: 'head',
      value:  jsCode
    };
    props.addModification(modification);
    const iFrame = document.getElementsByClassName("myClassname")[0];
    // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
    // @ts-ignore
    iFrame.contentWindow.postMessage({
      "path" : props.path,
      "type": "javascript-injection",
      "action": "click",
      "code": jsCode
    }, "*");
    handleClose();
  };

  let debouncedFn = null;

  const handleCodeChange = (event) => {
    event.persist();
    if(!debouncedFn){
      debouncedFn =  _.debounce(() => {
        setJsCode(event.target.value);
      }, 300);
    }

    debouncedFn();
  };

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Inject JavaScript
      </Button>

     <TextareaModal
       show={show}
       header={'Inject javascript code'}
       handleSubmit={handleJsCodeSubmit}
       handleChange={handleCodeChange}
       handleClose={handleClose}
     />
    </>
  );
};

export default InjectJavascript;

import React, {useState} from 'react';

import './css-injection.scss';
import {Button} from "react-bootstrap";
import {TextareaModal} from "../../../shared/textarea-modal/textarea-modal";
import _ from 'lodash';

/* eslint-disable-next-line */
export interface CssInjectionProps {
  path: string,
  addModification: (Modification) => void
}

export const CssInjection = (props: CssInjectionProps) => {
  const [show, setShow] = useState(false);
  const [css, setCss] = useState(null);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleCssCodeSubmit = () => {
    const modification = {
      name: "Insert css class",
      path: props.path,
      value:  css
    };
    props.addModification(modification);
    const iFrame = document.getElementsByClassName("myClassname")[0];
    // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
    // @ts-ignore
    iFrame.contentWindow.postMessage({
      "path" : props.path,
      "type": "css",
      "action": "click",
      "css": css
    }, "*");
    handleClose();
  };

  let debouncedFn = null;

  const handleCodeChange = (event) => {
    event.persist();
    if(!debouncedFn){
      debouncedFn =  _.debounce(() => {
        setCss(event.target.value);
      }, 300);
    }

    debouncedFn();
  };

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Insert css class
      </Button>

      <TextareaModal
        show={show}
        header={'Inject css class'}
        handleSubmit={handleCssCodeSubmit}
        handleChange={handleCodeChange}
        handleClose={handleClose}
      />
    </>
  );
};

export default CssInjection;

import React, {useState} from 'react';

import './html-injection.scss';
import {Button} from "react-bootstrap";
import {TextareaModal} from "../../../shared/textarea-modal/textarea-modal";
import _ from 'lodash';

/* eslint-disable-next-line */
export interface HtmlInjectionProps {
  path: string,
  innerHTML: [],
  addModification: (Modification) => void
}

export const HtmlInjection = (props: HtmlInjectionProps) => {
  const [show, setShow] = useState(false);
  const [html, setHtml] = useState(null);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleCssCodeSubmit = () => {
    const modification = {
      name: "htmlInjection",
      path: props.path,
      value:  html
    };
    props.addModification(modification);
    const iFrame = document.getElementsByClassName("myClassname")[0];
    // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
    // @ts-ignore
    iFrame.contentWindow.postMessage({
      "path" : props.path,
      "type": "html",
      "action": "click",
      "html": html
    }, "*");
    handleClose();
  };

  let debouncedFn = null;

  const handleCodeChange = (event) => {
    event.persist();
    if(!debouncedFn){
      debouncedFn =  _.debounce(() => {
        setHtml(event.target.value);
      }, 300);
    }

    debouncedFn();
  };

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Insert html elements
      </Button>

      <TextareaModal
        show={show}
        innerContent={props.innerHTML != null ? props.innerHTML.join('\n') : ''}
        header={'Insert html elements '}
        handleSubmit={handleCssCodeSubmit}
        handleChange={handleCodeChange}
        handleClose={handleClose}
      />
    </>
  );
};

export default HtmlInjection;

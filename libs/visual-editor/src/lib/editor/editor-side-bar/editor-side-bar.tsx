import React, {useState} from 'react';

import './editor-side-bar.scss';
import {Button, ListGroup, Modal} from "react-bootstrap";
import BackgroundChange from "./background-change/background-change";
import {InjectJavascript} from "./inject-javascript/inject-javascript";
import {ChangeInnerText} from "./change-inner-text/change-inner-text";
import CssInjection from "./css-injection/css-injection";
import HtmlInjection from "./html-injection/html-injection";
import Resize from "./resize/resize";

/* eslint-disable-next-line */
export interface EditorSideBarProps {
  path:string
}

export interface Modification {
  name: string,
  path: string,
  value: string
}

export const EditorSideBar = (props: EditorSideBarProps) => {


 const [modifications, setModifications] = useState([]);

  const addModification = (modification: Modification) => {
    const currentModifications: Modification[] = modifications.concat([modification]);
    setModifications(currentModifications);
    console.log(modifications)
  };

  const getChangeListItems = () => {
    return modifications.map((modification, index) => {
      return (
        <ListGroup.Item key={index}>
          <div>
            {modification.name}
          </div>
          <div>
            {modification.value}
          </div>
          <div>
            {modification.path}
          </div>
        </ListGroup.Item>)
    })
  };

  const modificationList = getChangeListItems();

  return (
    <div className='editor-sidebar'>
      <ListGroup>
        <ListGroup.Item>
          <BackgroundChange path={props.path} addModification={addModification}/>
        </ListGroup.Item>
        <ListGroup.Item>
          <InjectJavascript path={props.path} addModification={addModification}/>
        </ListGroup.Item>
        <ListGroup.Item>
          <ChangeInnerText path={props.path} addModification={addModification}/>
        </ListGroup.Item>
        <ListGroup.Item>
          <CssInjection path={props.path} addModification={addModification}/>
        </ListGroup.Item>
        <ListGroup.Item>
          <HtmlInjection path={props.path} addModification={addModification}/>
        </ListGroup.Item>
        <ListGroup.Item>
          <Resize path={props.path} addModification={addModification}/>
        </ListGroup.Item>
      </ListGroup>
      <ListGroup>
        {modificationList}
      </ListGroup>
    </div>
  );
};

export default EditorSideBar;

import React, {useState} from 'react';

import './editor-side-bar.scss';
import {Button, Form, FormControl, InputGroup, ListGroup, Modal} from "react-bootstrap";
import BackgroundChange from "./background-change/background-change";
import {InjectJavascript} from "./inject-javascript/inject-javascript";
import {ChangeInnerText} from "./change-inner-text/change-inner-text";
import CssInjection from "./css-injection/css-injection";
import HtmlInjection from "./html-injection/html-injection";
import Resize from "./resize/resize";
import Cookies from 'universal-cookie';
import axios from "axios";
import {useHistory} from "react-router-dom";
import _ from 'lodash';
import {environment} from "../../../../../../apps/web-editor-client/src/environments/environment";

/* eslint-disable-next-line */
export interface EditorSideBarProps {
  path:string
  innerHTML: []
}

export interface Modification {
  name: string,
  path: string,
  value: any
}

export const EditorSideBar = (props: EditorSideBarProps) => {


 const [modifications, setModifications] = useState([]);
 const [title, setTitle] = useState(null);

 const cookies = new Cookies();
 const history = useHistory();


 const saveModifications = () => {
   const genericModificationsNames = [
     'cssInjection',
     'textInjection',
     'htmlInjection',
     'backgroundChange'
   ];
   const standardisedModifications = modifications.map(modification => {
     return standardiseGeneralModification(modification);
   });

   const jsModification = standardisedModifications.filter(modification => modification.type === 'jsModification') || [];
   const resizeModifications = standardisedModifications.filter(modification => modification.type === 'resizeModifications') || [];
   const genericModification = standardisedModifications.filter(modification => {
     return genericModificationsNames.includes(modification.type);
   }) || [];
   const email = cookies.get("email");
   const name = title;
   const active = false;
   const timestamp = new Date().toString();

   const payload = {
     email,
     name,
     timestamp,
     active,
     jsModification,
     resizeModifications,
     genericModification
   };
   const url = environment.backEndEndpoint + 'design-crud/addDesign';

   axios.post(url, payload)
     .then(res => {
      history.push('/design-list')
     })
 }

 const handleClose = () => {
   history.push('/design-list')
 }

  let debouncedFn = null;

  const handleTitleChange = (event) => {
    event.persist();
    if(!debouncedFn){
      debouncedFn =  _.debounce(() => {
        setTitle(event.target.value);
      }, 300);
    }

    debouncedFn();
  };


 const standardiseGeneralModification = (modification: Modification) => {
   if(modification.path != null){
     return {
       type: modification.name,
       value: modification.value,
       selector: modification.path
     }
   }
   return {
     name: modification.name,
     value: modification.value,
   }
 };


  const addModification = (modification: Modification) => {
    const currentModifications: Modification[] = modifications.concat([modification]);
    setModifications(currentModifications);
  };

  const getChangeListItems = () => {
    return modifications.map((modification, index) => {
      return (
        <ListGroup.Item key={index}>
          <div>
            {modification.name}
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

      <div className='editor-buttons-container'>
        <Button variant='primary' className='save-modifications-button' size="lg" onClick={saveModifications}>
          Save changes
        </Button>
        <Button variant='secondary' className='close-editor' size="lg" onClick={handleClose} >
          Close
        </Button>
      </div>

      <ListGroup className='control-list'>
        <ListGroup.Item>
          <InputGroup>
            <InputGroup.Prepend>
              <InputGroup.Text>Title</InputGroup.Text>
            </InputGroup.Prepend>
            <Form>
              <FormControl onChange={handleTitleChange}/>
            </Form>

          </InputGroup>
        </ListGroup.Item>
        <ListGroup.Item className='modifications-header'>
          <h1>
            Choose a modification
          </h1>
        </ListGroup.Item>
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
          <HtmlInjection path={props.path} innerHTML={props.innerHTML} addModification={addModification}/>
        </ListGroup.Item>
        <ListGroup.Item>
          <Resize path={props.path} addModification={addModification}/>
        </ListGroup.Item>
      </ListGroup>
      <ListGroup className='modification-list'>
        <ListGroup.Item className='modifications-header'>
          <h1>
            Modifications:
          </h1>
        </ListGroup.Item>
        {modificationList}
      </ListGroup>
    </div>
  );
};

export default EditorSideBar;

import React, {useState} from 'react';

import './design-list.scss';

import Modal from 'react-bootstrap/Modal'
import {Button, Form, FormControl} from "react-bootstrap";
import {Route, Switch, useHistory, useRouteMatch} from 'react-router-dom';
import {VisualEditor} from "@web-editor/visual-editor";
import _ from 'lodash';
import AppNav from "./app-nav/app-nav";
import {AboutPage} from "@web-editor/about-page";
import ListComponent from "./list-page/list-component/list-component";
/* eslint-disable-next-line */
export interface DesignListProps {}

export const DesignList = (props: DesignListProps) => {
  const [show, setShow] = useState(false);
  const [websiteUrl, setUrl] = useState(null);
  const [filter, setFilter] = useState(null);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  let debouncedFn = null;
  const { path } = useRouteMatch();
  const history = useHistory();

  const handleUrlChange = (event) => {
    event.persist();
    if(!debouncedFn){
      debouncedFn =  _.debounce(() => {
        setUrl(event.target.value);
      }, 300);
    }

    debouncedFn();
  };


  const handleFilterChange = (event) => {
    event.persist();
    if(!debouncedFn){
      debouncedFn =  _.debounce(() => {
        setFilter(event.target.value);
      }, 300);
    }

    debouncedFn();
  };

  const handleCreate = () => {
    setShow(false);
    setUrl(null);
    history.push(path + '/editor');
  };

  const validateControl = () => {
    return websiteUrl == null || websiteUrl === '' ? true : false;
  }

  return (
    <div className='main-container'>
      <AppNav handleCreate={handleShow} handleFilterChange={handleFilterChange}/>
      <Switch>
        <Route exact path={path}>
          <div className='main-content-container'>
            <ListComponent filter={filter}/>
          </div>
          <Modal show={show} onHide={handleClose} className='url-modal'>
            <Modal.Header closeButton style={{border:"none"}}>
              <Modal.Title>Create design</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form>
                <FormControl type="text" placeholder="Enter url" className="mr-sm-2" onChange={handleUrlChange} isInvalid={validateControl()}/>
              </Form>
            </Modal.Body>
            <Modal.Footer style={{border:"none"}}>
              <Button variant="secondary" onClick={handleClose}>
                Close
              </Button>
              <Button variant="primary" onClick={handleCreate} disabled = {validateControl()}>
                Create
              </Button>
            </Modal.Footer>
          </Modal>
        </Route>
        <Route exact path={path + '/editor'}>
          <VisualEditor iframeUrl={websiteUrl}/>
        </Route>
        <Route exact path={path + '/guide'}>
          <AboutPage/>
        </Route>
      </Switch>

    </div>
  );
};


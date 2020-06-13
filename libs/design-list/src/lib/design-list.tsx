import React, {useState} from 'react';

import './design-list.scss';

import SideNav from "./side-nav/side-nav";
import ListPage from "./list-page/list-page";
import Modal from 'react-bootstrap/Modal'
import {Button, Form, FormControl} from "react-bootstrap";
import {Route, Switch, useHistory, useRouteMatch} from 'react-router-dom';
import {VisualEditor, Editor} from "@web-editor/visual-editor";
import _ from 'lodash';
/* eslint-disable-next-line */
export interface DesignListProps {}

export const DesignList = (props: DesignListProps) => {
  const [show, setShow] = useState(false);
  const [websiteUrl, setUrl] = useState(null);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  let debouncedFn = null;

  const { path, url } = useRouteMatch();
  const history = useHistory();
  console.log(path, url);
  const handleUrlChange = (event) => {
    event.persist();
    if(!debouncedFn){
      debouncedFn =  _.debounce(() => {
        setUrl(event.target.value);
      }, 300);
    }

    debouncedFn();
  };

  const handleCreate = () => {
    history.push(path + '/editor');
  };

  return (
    <div className='main-container'>
      <SideNav/>
      <Switch>
        <Route exact path={path}>
          <div className='main-content-container'>
            <ListPage handleModalShow={handleShow}/>
          </div>
          <Modal show={show} onHide={handleClose} className='url-modal'>
            <Modal.Header closeButton style={{border:"none"}}>
              <Modal.Title>Create design</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form>
                <FormControl type="text" placeholder="Enter url" className="mr-sm-2" onChange={handleUrlChange}/>
              </Form>
            </Modal.Body>
            <Modal.Footer style={{border:"none"}}>
              <Button variant="secondary" onClick={handleClose}>
                Close
              </Button>
              <Button variant="primary" onClick={handleCreate}>
                Create
              </Button>
            </Modal.Footer>
          </Modal>
        </Route>
        <Route exact path={path + '/editor'}>
          <VisualEditor iframeUrl={websiteUrl}/>
        </Route>
      </Switch>

    </div>
  );
};


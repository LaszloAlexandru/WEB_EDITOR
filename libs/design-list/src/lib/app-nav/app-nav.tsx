import React from 'react';

import './app-nav.scss';
import {Button, Form, FormControl, Nav, Navbar} from "react-bootstrap";
import {useLocation} from "react-router-dom";

/* eslint-disable-next-line */
export interface AppNavProps {
  handleCreate: () => void;
  handleFilterChange: (any) =>void;
}

export const AppNav = (props: AppNavProps) => {
  const location = useLocation();

  const getLeftNav = () => {
    if(location.pathname === '/design-list'){
      return (
        <>
          <Form inline>
            <FormControl type="text" onChange={props.handleFilterChange} placeholder="Search" className="mr-sm-2" />
          </Form>
          <Button variant="outline-info" onClick={props.handleCreate}>Create Design</Button>
        </>
      )
    }
    return <></>;
  }
  return (
    <>
        <Navbar bg="dark" variant="dark">
          <Navbar.Brand href="#home">VW Editor</Navbar.Brand>
          <Nav className="mr-auto">
            <Nav.Link href="/design-list">Home</Nav.Link>
            <Nav.Link href="/design-list/guide">Guide</Nav.Link>
          </Nav>
          {getLeftNav()}
        </Navbar>
    </>
  );
};

export default AppNav;

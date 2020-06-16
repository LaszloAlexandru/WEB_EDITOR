import React from 'react';

import './app-nav.scss';
import {Button, Form, FormControl, Nav, Navbar} from "react-bootstrap";

/* eslint-disable-next-line */
export interface AppNavProps {
  handleCreate: () => void;
  handleFilterChange: (any) =>void;
}

export const AppNav = (props: AppNavProps) => {
  return (
    <>
        <Navbar bg="dark" variant="dark">
          <Navbar.Brand href="#home">FMI Editor</Navbar.Brand>
          <Nav className="mr-auto">
            <Nav.Link href="/design-list">Home</Nav.Link>
            <Nav.Link href="/design-list/guide">Guide</Nav.Link>
          </Nav>
          <Form inline>
            <FormControl type="text" onChange={props.handleFilterChange} placeholder="Search" className="mr-sm-2" />
          </Form>
          <Button variant="outline-info" onClick={props.handleCreate}>Create Design</Button>
        </Navbar>
    </>
  );
};

export default AppNav;

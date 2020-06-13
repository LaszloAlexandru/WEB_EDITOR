import React from 'react';

import './list-search-bar.scss';
import {Button, Form, FormControl, Navbar} from "react-bootstrap";

/* eslint-disable-next-line */
export interface ListSearchBarProps {
  handleModalShow: () => void;
}

export const ListSearchBar = (props: ListSearchBarProps) => {
  return (
    <Navbar variant="dark" className='list-search-bar'>
      <Form inline>
        <FormControl type="text" placeholder="Search" className="mr-sm-2" />
      </Form>
      <Button className='create-design-button' variant="primary" onClick={props.handleModalShow}>
        Create Design
      </Button>
    </Navbar>
  );
};

export default ListSearchBar;

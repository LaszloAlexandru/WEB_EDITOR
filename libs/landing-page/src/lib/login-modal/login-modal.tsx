import React from 'react';

import './login-modal.scss';
import {Form} from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";
import {Link} from "react-router-dom";

/* eslint-disable-next-line */
export interface LoginModalProps {
  userNotFound: boolean;
  handleSubmit: (any) => void;
  handleChangeEmail: (any) => void;
  handleChangePassword: (any) => void;
}

export const LoginModal = (props: LoginModalProps) => {
  const { userNotFound, handleSubmit, handleChangeEmail, handleChangePassword} = props;

  const alert = userNotFound ?  <Alert variant={"danger"}>
    Wrong email or password
  </Alert> : null;

  return (
    <div>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" placeholder="Enter email" onChange={handleChangeEmail}/>
        </Form.Group>

        <Form.Group controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password" onChange={handleChangePassword}/>
        </Form.Group>
        {alert}
        <Button variant="primary" type="submit" className='sign-up-button'>
          Login
        </Button>
      </Form>
      <div>
        Do not hava an account? <Link to={'/sign-up'}> Create one!</Link>
      </div>
    </div>

  );
};

export default LoginModal;

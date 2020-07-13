import React from 'react';

import './signup-modal.scss';
import {Form} from "react-bootstrap";
import Button from "react-bootstrap/Button";
import {Link} from "react-router-dom";

/* eslint-disable-next-line */
export interface SignupModalProps {
  handleSubmit: (any) => void;
  handleChangeEmail: (any) => void;
  handleChangePassword: (any) => void;
  handleChangeUsername: (any) => void;
  emailAlreadyInUse: boolean;
}

export const SignupModal = (props: SignupModalProps) => {
  const { handleSubmit, handleChangeEmail, handleChangePassword, handleChangeUsername, emailAlreadyInUse } = props;

  const invalidEmail = emailAlreadyInUse ? <Form.Text style={{color: "red"}} className="text-muted" >
    Email already in use
  </Form.Text> : null;

  return (
    <div>
      <Form onSubmit={(e) => handleSubmit(e)}>

        <Form.Group controlId="forBasicUserName">
          <Form.Label>Username</Form.Label>
          <Form.Control required type="name" placeholder="Enter username" onChange={handleChangeUsername} />
        </Form.Group>

        <Form.Group controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" placeholder="Enter email" onChange={handleChangeEmail} isValid={emailAlreadyInUse ? false : null}/>
          {invalidEmail}
        </Form.Group>

        <Form.Group controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password" onChange={handleChangePassword} required/>
        </Form.Group>

        <Button variant="primary" type="submit" className='sign-up-button'>
          Sign up
        </Button>
      </Form>
      <div>
        Already have an account? <Link to={'/login'}> Log in!</Link>
      </div>
    </div>
  );
};

export default SignupModal;

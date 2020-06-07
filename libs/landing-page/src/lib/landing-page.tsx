import React, {useState} from 'react';

import './landing-page.scss';
import {Form} from "react-bootstrap";
import Button from "react-bootstrap/Button";
import axios from 'axios';
import * as bcrypt from 'bcrypt';

/* eslint-disable-next-line */
export interface LandingPageProps {}

export const LandingPage = (props: LandingPageProps) => {
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [wasRegistered, setWasRegistered] = useState(null);

  const handleSubmit = (event) => {
    event.preventDefault();
    axios.get('http://localhost:3333/api/auth?id=' + email)
      .then(res => {
        setWasRegistered(res.data);
      })
  };

  const handleChangeEmail = (event) => {
    const emailValue = event.target.value;
    setEmail(emailValue);
  };

  const handleChangePassword = (event) => {
    const passwordValue = event.target.value;
    setPassword(passwordValue);
  };
  if(wasRegistered) {
    if(wasRegistered.password){
      return <div>YAY IT WAS REGISTERED</div>
    }
  }
  return (
    <div>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" placeholder="Enter email" onChange={handleChangeEmail} />
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>

        <Form.Group controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password" onChange={handleChangePassword}/>
        </Form.Group>
        <Form.Group controlId="formBasicCheckbox">
          <Form.Check type="checkbox" label="Check me out" />
        </Form.Group>
        <Button variant="primary" type="submit" >
          Submit
        </Button>
      </Form>
    </div>
  );
};

export default LandingPage;

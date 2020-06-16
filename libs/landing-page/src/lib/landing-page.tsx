import React, {useState} from 'react';

import './landing-page.scss';
import axios from 'axios';
import LoginModal from "./login-modal/login-modal";
import SignupModal from "./signup-modal/signup-modal";
import Cookies from 'universal-cookie';
import {Route} from 'react-router-dom';
import { useHistory } from "react-router-dom";

/* eslint-disable-next-line */
export interface LandingPageProps {}

export const LandingPage = (props: LandingPageProps) => {
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [userName, setUsername] = useState(null);
  const [wasRegistered, setWasRegistered] = useState(null);
  const [emailAlreadyInUse, setEmailAlreadyInUse] = useState(false);
  const [userNotFound, setUserNotFound] = useState(false);

  const cookies = new Cookies();
  const history = useHistory();

  const checkBearerToken = async () => {
    const bearerToken = cookies.get("bearerToken");

    if (bearerToken) {
      await axios.post('http://localhost:3333/api/auth/verify', {bearerToken})
        .then(res => {
          history.push('/design-list')
        })

    }
  };

  checkBearerToken();

  if(wasRegistered) {
    history.push("/login");
  }

  const handleSubmit = (event: any) => {
    event.preventDefault();
    axios.post('http://localhost:3333/api/auth', {name: userName, email, password})
      .then(res => {
        setWasRegistered(res.data);
      })
      .catch(err => {
        if(err.response.status === 409) {
          setEmailAlreadyInUse(true);
        }
      })
  };

  const handleUsername = (event: any) => {
    const userNameValue = event.target.value;
    setUsername(userNameValue);
  };

  const handleChangeEmail = (event: any) => {
    const emailValue = event.target.value;
    setEmail(emailValue);
  };

  const handleChangePassword = (event: any) => {
    const passwordValue = event.target.value;
    setPassword(passwordValue);
  };

  const handleLogin = (event: any) => {
    event.preventDefault();
    axios.post('http://localhost:3333/api/auth/login', { email, password})
      .then(res => {
        const bearerToken = res.data.bearerToken;
        cookies.set("email", email);
        cookies.set("bearerToken", bearerToken);
        history.push('/design-list')
      })
      .catch(err => {
        if(err.response.status === 404) {
          setUserNotFound(true);
        }
      })
  };

  return (
    <div className='landing-page'>
      <div className='sign-up-sidebar'>
        <Route exact path={'/login'}>
          <LoginModal
            userNotFound={userNotFound}
            handleSubmit={handleLogin}
            handleChangeEmail={handleChangeEmail}
            handleChangePassword={handleChangePassword}/>
        </Route>
        <Route path='/sign-up'>
          <SignupModal
            handleSubmit={handleSubmit}
            handleChangeEmail={handleChangeEmail}
            handleChangePassword={handleChangePassword}
            handleChangeUsername={handleUsername}
            emailAlreadyInUse={emailAlreadyInUse}/>
        </Route>
      </div>
    </div>
  );
};

export default LandingPage;

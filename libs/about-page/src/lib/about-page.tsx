import React from 'react';

import './about-page.scss';
import {Button, Card, ListGroup} from "react-bootstrap";
import {environment} from "../../../../apps/web-editor-client/src/environments/environment";
import axios from "axios";

/* eslint-disable-next-line */
export interface AboutPageProps {}

export const AboutPage = (props: AboutPageProps) => {

  return (
    <div className='about-page-container'>
      <Card className='guide-card'>
        <Card.Header as="h5">Connect you web-site</Card.Header>
        <Card.Body>
          <Card.Text>
            First step is to download the connection js and introduce it in the head of your website.
          </Card.Text>
          <Button href= {environment.backEndEndpoint + "design-crud/getFile"} variant='primary' >
            Download
          </Button>
        </Card.Body>
      </Card>
      <Card  className='guide-card'>
        <Card.Header as="h5">Create design</Card.Header>
        <Card.Body>
          <Card.Text>
            Click on the create button
          </Card.Text>
        </Card.Body>
        <Card.Img variant="bottom" src="assets/img1.jpg" />
      </Card>
      <Card  className='guide-card'>
        <Card.Header as="h5">Enter url</Card.Header>
        <Card.Body>
          <Card.Text>
            A modal will pop up, enter the url of your website
          </Card.Text>
        </Card.Body>
        <Card.Img variant="bottom" src="assets/img2.jpg" />
      </Card>
      <Card  className='guide-card'>
        <Card.Header as="h5"> Editor</Card.Header>
        <Card.Body>
          <Card.Text>
            Select element
          </Card.Text>
        </Card.Body>
        <Card.Img variant="bottom" src="assets/img3.jpg" />
      </Card>
      <Card  className='guide-card'>
        <Card.Header as="h5"> Save change</Card.Header>
        <Card.Body>
          <Card.Text>
            Click the save button
          </Card.Text>
        </Card.Body>
        <Card.Img variant="bottom" src="assets/img4.jpg" />
      </Card>
      <Card  className='guide-card'>
        <Card.Header as="h5"> Save your changes</Card.Header>
        <Card.Body>
          <Card.Text>
            Save your changes
          </Card.Text>
        </Card.Body>
        <Card.Img variant="bottom" src="assets/img5.jpg" />
      </Card>
    </div>
  );
};


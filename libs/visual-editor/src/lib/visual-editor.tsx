import React, {useState} from 'react';
import './visual-editor.scss';
import Editor from "./editor/editor";
import Button from "react-bootstrap/Button";
import {Navbar} from "react-bootstrap";

/* eslint-disable-next-line */
export interface VisualEditorProps {
  iframeUrl: string;
}

export const VisualEditor = (props:VisualEditorProps) => {

  return (
    <div className='editor-page'>
      <Navbar expand="lg" variant="dark" className='editor-nav'>
          <div className='editor-buttons'>
            <Button>More deets</Button>
            <Button>
              Dank memes
            </Button>
          </div>
      </Navbar>

      <div className='editor-container'>
        <Editor iframeURL={props.iframeUrl}/>
      </div>

    </div>
  )
};

export default VisualEditor;

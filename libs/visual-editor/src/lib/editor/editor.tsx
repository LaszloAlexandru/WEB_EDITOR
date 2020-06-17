import React, {useState} from 'react';

import './editor.scss';
import Iframe from "react-iframe";
import {ListGroup} from "react-bootstrap";
import EditorSideBar from "./editor-side-bar/editor-side-bar";

/* eslint-disable-next-line */
export interface EditorProps {
  iframeURL: string
}

export const Editor = (props: EditorProps) => {
  const [path, setPath] = useState(null);
  const [innerHTML, setInnerHTML] = useState(null);
  const handleIframeTask = (e) => {
    if(e.data.action === 'click') {
      setPath(e.data.path);
      setInnerHTML(e.data.innerHTML)
    }
    const iFrame = document.getElementsByClassName("myClassname")[0];
    if(iFrame != null) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
      // @ts-ignore
      iFrame.contentWindow.postMessage({
        "path" : e.data.path,
        "action": e.data.action,
        "style": {
          border: '1px solid blue'
        }
      }, "*");
    }
  };

  window.addEventListener('message', handleIframeTask);

  const iframeURL = props.iframeURL || 'http://localhost:3000/';
  return (
    <>
      <div className='iframe-container'>
        <Iframe url={iframeURL}
                id="myId"
                width={"100%"}
                height={"100%"}
                className="myClassname"
                styles={{height: "25px"}}/>
      </div>
      <EditorSideBar path={path} innerHTML={innerHTML}/>
    </>
  );

};

export default Editor;

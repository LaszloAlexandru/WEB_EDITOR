import React from 'react';

import './editor.scss';
import Iframe from "react-iframe";

/* eslint-disable-next-line */
export interface EditorProps {
  iframeURL: string
}

export class Editor extends React.Component<EditorProps, {}> {

  constructor (props: EditorProps) {
    super(props);
  }

  componentDidMount() {
    window.addEventListener('message', this.handleIframeTask);
  }

  handleIframeTask = (e) => {
    console.log(e.data);
    const iFrame = document.getElementsByClassName("myClassname")[0];
    // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
    // @ts-ignore
    iFrame.contentWindow.postMessage({
      "path" : e.data,
      "border": "2px solid red;"
    }, "*");
    if (e.origin !== 'https://localhost:3000/') {
      return;
    }
    window.postMessage("background-color:red;" + e.data, "*");
  };

  render () {
    return (
      <div>
        <Iframe url={this.props.iframeURL}
                id="myId"
                width={"1000px"}
                height={"1000px"}
                className="myClassname"
                styles={{height: "25px"}}/>
      </div>
    );
  }

};

export default Editor;

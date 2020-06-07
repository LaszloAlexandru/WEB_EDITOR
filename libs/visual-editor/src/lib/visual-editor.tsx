import React from 'react';
import Form from 'react-bootstrap/Form'
import './visual-editor.scss';
import Editor from "./editor/editor";
import Button from "react-bootstrap/Button";

/* eslint-disable-next-line */
export interface VisualEditorProps {}


export interface VisualEditorState {
  display: boolean;
  iframeURL: string;
}

export class VisualEditor extends React.Component<VisualEditorProps, VisualEditorState> {

  constructor(props: VisualEditorProps){
    super(props);
    this.state = {
      display:false,
      iframeURL: null
    }
  }

  handleURLSubmit = (event) => {
    const form = event.currentTarget;
    const newURL = form.url.value;
    this.setState(
      {
        display: !this.state.display,
        iframeURL: newURL
      }
    );
  };

  displayForm = () => {
    return (
      <div>
        <Form onSubmit={this.handleURLSubmit}>
          <Form.Group controlId = "formBasicURL">
            <Form.Label> URL</Form.Label>
            <Form.Control type="text" name="url" placeholder="Enter URL" />
          </Form.Group>
          <Button type={"submit"} variant="primary" />
        </Form>
      </div>
    );
  };

  displayEditor = () => {
    return (
      <div>
        <Editor iframeURL={this.state.iframeURL}/>
      </div>
    )
  };


  render () {
    if(!this.state.display){
      return this.displayForm();
    } else {
      return this.displayEditor();
    }
  }

};

export default VisualEditor;

import React from 'react';
import './visual-editor.scss';
import Editor from "./editor/editor";


/* eslint-disable-next-line */
export interface VisualEditorProps {
  iframeUrl: string;
}

export const VisualEditor = (props:VisualEditorProps) => {

  return (
    <div className='editor-page'>
      <div className='editor-container'>
        <Editor iframeURL={props.iframeUrl}/>
      </div>

    </div>
  )
};

export default VisualEditor;

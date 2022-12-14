import React from "react";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

const TextEditor = ({ editorState, setEditorState }) => {
  const onEditorStateChange = (value) => {
    setEditorState({ content: value });
  };
  return (
    <div>
      <Editor
        editorState={editorState.content}
        wrapperClassName="demo-wrapper"
        editorClassName="demo-editor text-editor-section"
        onEditorStateChange={onEditorStateChange}
        toolbar={{
          image:{className:'hidden'}
        }}
      />
    </div>
  );
};

export default TextEditor;

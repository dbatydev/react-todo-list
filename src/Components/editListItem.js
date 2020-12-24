import React from "react";
//import JoditEditor from "jodit-react";

import { Editor } from "@tinymce/tinymce-react";

class EditListItem extends React.Component {
  constructor(props) {
    super(props);

    this.handleEditorChange = this.handleEditorChange.bind(this);

    this.state = {
      newContent: ""
    };
  }

  //https://www.tiny.cloud/docs/integrations/react/#tinymcereactintegrationquickstartguide
  //https://codepen.io/brianswisher/pen/qOwXYj?editors=1010

  /**
   * handleEditorChange()
   * on wizzywig editor change, the state newContent is updated, if the save
   * button is clicked then it grabs the state var newContent and sends it to the
   * Listitem compnent
   *
   * @param {*string} content the content inside the wizzywig
   * @param {*object} editor
   *
   */
  handleEditorChange = (content, editor) => {
    this.setState({
      newContent: content
    });

    this.props.sendData(content);
  };

  render() {
    return (
      <div>
        <Editor
          initialValue={this.props.item.item.content}
          init={{
            height: 300,
            content: "",
            menubar: true,
            plugins: [
              "advlist autolink lists link image charmap print preview anchor",
              "searchreplace visualblocks code fullscreen",
              "insertdatetime media table paste code help wordcount"
            ],
            toolbar:
              "undo redo | formatselect | bold italic backcolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | removeformat | help"
          }}
          onEditorChange={this.handleEditorChange}
        />
      </div>
    );
  }
}

export default EditListItem;

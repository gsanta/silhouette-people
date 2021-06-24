import * as React from "react";
import { EditorService } from "../../service/editor/EditorService";
import { MeshLoaderComponent } from "./MeshLoaderComponent";

export class EditorComponent extends React.Component<{ editor: EditorService }> {


    render() {
        if (!this.props.editor.isEditorOpen) { return null; }

        return (
            <MeshLoaderComponent meshLoaderController={this.props.editor.meshLoaderController}/>
        )
    }
}
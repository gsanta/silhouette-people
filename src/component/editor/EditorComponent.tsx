import * as React from "react";
import { EditorService } from "../../service/editor/EditorService";
import { MeshLoaderPanel } from './MeshLoaderPanel';
import { CameraPanel } from './CameraPanel';
import { FeaturesPanel } from './FeaturesPanel';
import { GraphPanel } from './GraphPanel';
import { DebugPanel } from './DebugPanel';
import { GameObjectPanel } from './GameObjectPanel';
import { SceneExportPanel } from './SceneExportPanel';
import { ToolPanel } from './ToolPanel';
import '../../../assets/css/panel.scss';
import { RoutePanel } from "./RoutePanel";

export class EditorComponent extends React.Component<{ editor: EditorService }> {
    render() {
        if (!this.props.editor.isEditorOpen) { return null; }

        return (
            <div className="editor">
                Editor

                <MeshLoaderPanel meshLoaderController={this.props.editor.meshLoaderController} />
                <GameObjectPanel controller={this.props.editor.gameObjectController} />
                <RoutePanel controller={this.props.editor.routeController} />
                <CameraPanel cameraController={this.props.editor.cameraController} />
                <SceneExportPanel sceneExportController={this.props.editor.sceneExportController} />
                <ToolPanel toolController={this.props.editor.toolController} />
                <FeaturesPanel fogOfWarController={this.props.editor.fogOfWarController} />
                <GraphPanel graphController={this.props.editor.graphController} />
                <DebugPanel controller={this.props.editor.debugController} />
            </div>
        )
    }
}
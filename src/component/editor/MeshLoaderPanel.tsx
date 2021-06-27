import * as React from "react";
import { Form } from "react-bootstrap";
import { MeshLoaderController } from "../../service/editor/controllers/MeshLoaderController";

export class MeshLoaderPanel extends React.Component<{ meshLoaderController: MeshLoaderController }> {

    render() {
        if (!this.props.meshLoaderController.isDialogOpen) { return null; }

        return (
            <div className="panel">
                <div className="title-row">Model loader</div>
                <div className="input-row">
                    <label htmlFor="model-path">Model path</label>
                    <input id="model-path" onChange={e => this.onModelNameChange(e)} className="input-field" type="text"/>
                </div>
                <div className="input-row">
                    <label htmlFor="texture-path">Texture path</label>
                    <input id="texture-path" onChange={e => this.onTextureNameChange(e)} className="input-field" type="text"/>
                </div>
                <div className="input-row">
                    <label htmlFor="collision-checkbox">Collision</label>
                    <Form.Check checked={this.props.meshLoaderController.collision} onChange={() => this.onCollisionChange()} id="collision-checkbox" className="input-field"/>
                </div>
                <div className="input-row">
                    <label htmlFor="removeroot-checkbox">Remove Root</label>
                    <Form.Check checked={this.props.meshLoaderController.removeRoot} onChange={() => this.onRemoveRootChange()} id="removeroot-checkbox" className="input-field"/>
                </div>
                <div className="button-row">
                    <button onClick={() => this.load()}>Load</button>
                </div>
            </div>
        );
    }

    private load() {
        this.props.meshLoaderController.load();
    }

    private onCollisionChange() {
        this.props.meshLoaderController.collision = !this.props.meshLoaderController.collision;
    }

    private onRemoveRootChange() {
        this.props.meshLoaderController.removeRoot = !this.props.meshLoaderController.removeRoot;
    }

    private onModelNameChange(e: React.SyntheticEvent<HTMLInputElement>) {
        this.props.meshLoaderController.modelName = e.currentTarget.value;
    }

    private onTextureNameChange(e: React.SyntheticEvent<HTMLInputElement>) {
        this.props.meshLoaderController.textureName = e.currentTarget.value;
    }
}
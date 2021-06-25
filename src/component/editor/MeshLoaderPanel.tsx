import * as React from "react";
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
                    <label htmlFor="collision-checkbox">Collision</label>
                    <input onChange={() => this.onCollisionChange()} checked={this.props.meshLoaderController.collision} id="collision-checkbox" className="input-field" type="checkbox"/>
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

    private onModelNameChange(e: React.SyntheticEvent<HTMLInputElement>) {
        this.props.meshLoaderController.modelName = e.currentTarget.value;
    }
}
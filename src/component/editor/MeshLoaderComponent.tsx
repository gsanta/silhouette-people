import * as React from "react";
import '../../../assets/css/dialog.scss';
import { MeshLoaderController } from "../../service/editor/controllers/MeshLoaderController";

export class MeshLoaderComponent extends React.Component<{ meshLoaderController: MeshLoaderController }> {

    render() {
        if (!this.props.meshLoaderController.isDialogOpen) { return null; }

        return (
            <div className="dialog">
                <div className="input-row">
                    <div>Model path</div><input onChange={e => this.onModelNameChange(e)} className="input-field" type="text"/>
                </div>
                <div className="input-row">
                    <label htmlFor="collision-checkbox">Collision</label>
                    <input onChange={() => this.onCollisionChange()} checked={this.props.meshLoaderController.collision} id="collision-checkbox" className="input-field" type="checkbox"/>
                </div>
                <div className="input-row">
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
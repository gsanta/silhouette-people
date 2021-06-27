import * as React from "react";
import { GraphController } from "../../service/editor/controllers/GraphController";

export class ToolPanel extends React.Component<{ graphController: GraphController }> {

    render() {
        return (
            <div className="panel">
                <div className="title-row">Selected edge</div>
                <div className="input-row">
                    <label htmlFor="edge-thickness">thickness</label>
                    <input id="edge-thickness" onChange={e => this.onEdgeThicknessChange(e)} className="input-field" type="number"/>
                </div>
            </div>
        );
    }

    private onEdgeThicknessChange(e: React.SyntheticEvent<HTMLInputElement>) {

    }
}
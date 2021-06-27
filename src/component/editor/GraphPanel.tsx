import * as React from "react";
import { Button } from "react-bootstrap";
import { GraphController } from "../../service/editor/controllers/GraphController";

export class GraphPanel extends React.Component<{ graphController: GraphController }> {

    render() {
        if (!this.props.graphController.edge) {
            return null;
        }

        return (
            <div className="panel">
                <div className="title-row">Selected edge</div>
                <div className="input-row">
                    <label htmlFor="edge-thickness">thickness</label>
                    <input id="edge-thickness" onChange={e => this.onEdgeThicknessChange(e)} className="input-field" type="number"/>
                </div>
                <div className="button-row start">
                    <Button variant="secondary" className="input-button" onClick={() => this.deleteEdge()}>Delete edge</Button>
                </div>
            </div>
        );
    }

    private onEdgeThicknessChange(e: React.SyntheticEvent<HTMLInputElement>) {
        this.props.graphController.thickness = parseFloat(e.currentTarget.value)
    }

    private deleteEdge() {
        this.props.graphController.deleteEdge();
    }
}
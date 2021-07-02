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
                    <input id="edge-thickness" value={this.props.graphController.thickness} onChange={e => this.onEdgeThicknessChange(e)} className="input-field" type="number"/>
                </div>
                <div className="input-row">
                    <label htmlFor="edge-thickness">vertex1 id</label>
                    <input id="edge-thickness" value={this.props.graphController.vertex1Id} onChange={e => this.onVertex1IdChange(e)} className="input-field" type="string"/>
                </div>
                <div className="input-row">
                    <label htmlFor="edge-thickness">vertex2 id</label>
                    <input id="edge-thickness" value={this.props.graphController.vertex2Id} onChange={e => this.onVertex2IdChange(e)} className="input-field" type="string"/>
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

    private onVertex1IdChange(e: React.SyntheticEvent<HTMLInputElement>) {
        this.props.graphController.vertex1Id = e.currentTarget.value;
    }

    private onVertex2IdChange(e: React.SyntheticEvent<HTMLInputElement>) {
        this.props.graphController.vertex2Id = e.currentTarget.value;
    }
}
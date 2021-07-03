import * as React from "react";
import { Button } from "react-bootstrap";
import { RouteController } from "../../service/editor/controllers/RouteController";

export class RoutePanel extends React.Component<{ controller: RouteController }> {

    render() {
        if (!this.props.controller.isVisible()) { return null; }

        return (
            <div className="panel">
                <div className="title-row">Route</div>
                <div className="input-row">
                    <label htmlFor="edge-thickness">from</label>
                    <input id="edge-thickness" value={this.props.controller.from} onChange={e => this.onFromChange(e)} className="input-field" type="string"/>
                </div>
                <div className="input-row">
                    <label htmlFor="edge-thickness">to</label>
                    <input id="edge-thickness" value={this.props.controller.to} onChange={e => this.onToChange(e)} className="input-field" type="string"/>
                </div>
                <div className="button-row start">
                    <Button variant="secondary" className="input-button" onClick={() => this.clearRoute()}>Clear route</Button>
                    <Button variant="secondary" className="input-button" onClick={() => this.createRoute()}>Create route</Button>
                </div>
            </div>
        );
    }

    private clearRoute() {
    }

    private createRoute() {
        this.props.controller.createRoute();
    }

    private onFromChange(e: React.SyntheticEvent<HTMLInputElement>) {
        this.props.controller.from = e.currentTarget.value;
    }

    private onToChange(e: React.SyntheticEvent<HTMLInputElement>) {
        this.props.controller.to = e.currentTarget.value;
    }
}
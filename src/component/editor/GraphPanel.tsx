import * as React from "react";
import { Button, Dropdown } from "react-bootstrap";
import { PathShapeType } from "../../model/math/path/PathShape";
import { GraphController } from "../../service/editor/controllers/GraphController";
import { EdgeColor, EdgeDirection } from "../../service/graph/GraphEdge";

export class GraphPanel extends React.Component<{ controller: GraphController }> {

    constructor(props: {controller: GraphController}) {
        super(props);

        this.onDirectionChange = this.onDirectionChange.bind(this);
        this.onColorChange = this.onColorChange.bind(this);
    }

    render() {
        if (!this.props.controller.edge) {
            return null;
        }

        return (
            <div className="panel">
                <div className="title-row">Selected edge</div>
                <div className="input-row">
                    <label htmlFor="edge-thickness">thickness</label>
                    <input id="edge-thickness" value={this.props.controller.thickness} onChange={e => this.onEdgeThicknessChange(e)} className="input-field" type="number"/>
                </div>
                <div className="input-row">
                    <label htmlFor="edge-thickness">vertex1 id</label>
                    <input id="edge-thickness" value={this.props.controller.vertex1Id} onChange={e => this.onVertex1IdChange(e)} className="input-field" type="string"/>
                </div>
                <div className="input-row">
                    <label htmlFor="edge-thickness">vertex2 id</label>
                    <input id="edge-thickness" value={this.props.controller.vertex2Id} onChange={e => this.onVertex2IdChange(e)} className="input-field" type="string"/>
                </div>
                <div className="input-row">
                    <label htmlFor="edge-thickness">direction</label>
                    {this.renderEdgeDirectionDropdown()}
                </div>
                <div className="input-row">
                    <label htmlFor="edge-thickness">color</label>
                    {this.renderEdgeColorDropdown()}
                </div>
                <div className="input-row">
                    <label htmlFor="edge-thickness">shape</label>
                    {this.renderPathShapeTypes()}
                </div>
                
                <div className="button-row start">
                    <Button variant="danger" className="input-button" onClick={() => this.deleteEdge()}>Delete edge</Button>
                </div>
            </div>
        );
    }

    private renderEdgeDirectionDropdown() {
        const directionNames: EdgeDirection[] = [EdgeDirection.V1_V2, EdgeDirection.V2_V1, EdgeDirection.UNDIRECTED];
        const currentDirection = this.props.controller.direction;
        const directions = directionNames.map(direction => <Dropdown.Item active={direction === currentDirection} eventKey={direction}>{direction}</Dropdown.Item>);

        return (
            <Dropdown className="dropdown-button" onSelect={this.onDirectionChange}>
                <Dropdown.Toggle variant="secondary" id="dropdown-basic">
                    {currentDirection}
                </Dropdown.Toggle>

                <Dropdown.Menu>
                    {directions}
                </Dropdown.Menu>
            </Dropdown>
        );
    }

    private onDirectionChange(eventKey: EdgeDirection) {
        this.props.controller.direction = eventKey;
    }

    private renderEdgeColorDropdown() {
        const colorNames: EdgeColor[] = [EdgeColor.RED, EdgeColor.GREEN, EdgeColor.GRAY];
        const currentColor = this.props.controller.color;
        const colors = colorNames.map(color => <Dropdown.Item className={color} active={color === currentColor} eventKey={color}>{color}</Dropdown.Item>);

        return (
            <Dropdown className="dropdown-button" onSelect={this.onColorChange}>
                <Dropdown.Toggle className={currentColor} variant="secondary" id="dropdown-basic">
                    {currentColor}
                </Dropdown.Toggle>

                <Dropdown.Menu>
                    {colors}
                </Dropdown.Menu>
            </Dropdown>
        );
    }

    private renderPathShapeTypes() {
        const currentShape = this.props.controller.shape;

        const colors = PathShapeType.all().map(shape => <Dropdown.Item className={shape} active={shape === currentShape} eventKey={shape}>{shape}</Dropdown.Item>);

        return (
            <Dropdown className="dropdown-button" onSelect={this.onPathShapeChange}>
                <Dropdown.Toggle className={currentShape} variant="secondary" id="dropdown-basic">
                    {currentShape}
                </Dropdown.Toggle>

                <Dropdown.Menu>
                    {colors}
                </Dropdown.Menu>
            </Dropdown>
        );
    }

    private onPathShapeChange(eventKey: PathShapeType) {
        this.props.controller.shape = eventKey;
    }

    private onColorChange(eventKey: EdgeColor) {
        this.props.controller.color = eventKey;
    }


    private onEdgeThicknessChange(e: React.SyntheticEvent<HTMLInputElement>) {
        this.props.controller.thickness = parseFloat(e.currentTarget.value)
    }

    private deleteEdge() {
        this.props.controller.deleteEdge();
    }

    private onVertex1IdChange(e: React.SyntheticEvent<HTMLInputElement>) {
        this.props.controller.vertex1Id = e.currentTarget.value;
    }

    private onVertex2IdChange(e: React.SyntheticEvent<HTMLInputElement>) {
        this.props.controller.vertex2Id = e.currentTarget.value;
    }
}
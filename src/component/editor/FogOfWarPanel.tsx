import * as React from "react";
import { ButtonGroup, ToggleButton } from "react-bootstrap";
import { CameraController } from "../../service/editor/controllers/CameraController";


export class FogOfWarPanel extends React.Component<{ cameraController: CameraController }> {


    render() {
        const buttons = this.props.cameraController.cameras.map(name => this.renderButton(name));

        return (

            <div className="panel">
                <div className="title-row">Cameras</div>
                <div className="button-row">{buttons}</div>
            </div>  
        );
    }
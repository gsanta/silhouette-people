import * as React from "react";
import { ButtonGroup, ToggleButton } from "react-bootstrap";
import { CameraController } from "../../service/editor/controllers/CameraController";


export class CameraPanel extends React.Component<{ cameraController: CameraController }> {


    render() {
        const buttons = this.props.cameraController.cameras.map(name => this.renderButton(name));

        return (

            <div className="panel">
                <div className="title-row">Cameras</div>
                <div className="button-row">{buttons}</div>
            </div>  
        );
    }

    private renderButton(name: string) {
        const cameraController = this.props.cameraController;
        
        return (
            <ButtonGroup toggle className="mb-2 input-button">
                <ToggleButton
                    type="checkbox"
                    variant="secondary"
                    checked={cameraController.activeCamera === name}
                    value="1"
                    onChange={() => cameraController.activeCamera = name}
                >
                    {name}
                </ToggleButton>
            </ButtonGroup>

        )
    }
}
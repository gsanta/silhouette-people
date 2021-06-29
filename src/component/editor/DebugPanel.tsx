import * as React from "react";
import { ButtonGroup, ToggleButton } from "react-bootstrap";
import { DebugController } from "../../service/editor/controllers/DebugController";

export class DebugPanel extends React.Component<{ controller: DebugController }> {
    render() {

        return (

            <div className="panel">
                <div className="title-row">Debug</div>
                <div className="button-row">{this.renderButton()}</div>
            </div>  
        );
    }


    renderButton() {
        const controller = this.props.controller;
        
        return (
            <ButtonGroup toggle className="mb-2 input-button">
                <ToggleButton
                    type="checkbox"
                    variant="secondary"
                    checked={controller.boundingBoxVisibility}
                    value="1"
                    onChange={() => controller.boundingBoxVisibility = !controller.boundingBoxVisibility}
                >
                    Collision meshes
                </ToggleButton>
            </ButtonGroup>

        )
    }
}
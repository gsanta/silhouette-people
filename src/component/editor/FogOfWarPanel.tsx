import * as React from "react";
import { ButtonGroup, ToggleButton } from "react-bootstrap";
import { FogOfWarController } from "../../service/editor/controllers/FogOfWarController";

export class FogOfWarPanel extends React.Component<{ fogOfWarController: FogOfWarController }> {


    render() {

        return (

            <div className="panel">
                <div className="title-row">Fog of War</div>
                <div className="button-row">{this.renderButton()}</div>
            </div>  
        );
    }


    renderButton() {
        const fogOfWarController = this.props.fogOfWarController;
        
        return (
            <ButtonGroup toggle className="mb-2 input-button">
                <ToggleButton
                    type="checkbox"
                    variant="secondary"
                    checked={fogOfWarController.visible}
                    value="1"
                    onChange={() => fogOfWarController.visible = !fogOfWarController.visible}
                >
                    Is visible
                </ToggleButton>
            </ButtonGroup>

        )
    }
}
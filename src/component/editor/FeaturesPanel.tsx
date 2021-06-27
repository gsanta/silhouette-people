import * as React from "react";
import { ButtonGroup, ToggleButton } from "react-bootstrap";
import { FogOfWarController } from "../../service/editor/controllers/FogOfWarController";

export class FeaturesPanel extends React.Component<{ fogOfWarController: FogOfWarController }> {
    render() {

        return (

            <div className="panel">
                <div className="title-row">Features</div>
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
                    checked={fogOfWarController.enabled}
                    value="1"
                    onChange={() => fogOfWarController.enabled = !fogOfWarController.enabled}
                >
                    Fog of war
                </ToggleButton>
            </ButtonGroup>

        )
    }
}
import * as React from "react";
import { ButtonGroup, ToggleButton, Button } from "react-bootstrap";
import { GameObjectController } from "../../service/editor/controllers/GameObjectController";

export class GameObjectPanel extends React.Component<{ controller: GameObjectController }> {
    render() {
        if (!this.props.controller.gameObject) { return null; }

        return (

            <div className="panel">
                <div className="title-row">Game object</div>
                <div className="button-row">{this.renderCollisionToggle()}</div>
                <div className="button-row">{this.renderRemoveButton()}</div>
            </div>  
        );
    }

    renderCollisionToggle() {
        const controller = this.props.controller;
        
        return (
            <ButtonGroup toggle className="mb-2 input-button">
                <ToggleButton
                    type="checkbox"
                    variant="secondary"
                    checked={controller.collisionMesh}
                    value="1"
                    onChange={() => controller.setCollisionMesh(!controller.collisionMesh)}
                >
                    Collision
                </ToggleButton>
            </ButtonGroup>
        );
    }

    renderRemoveButton() {
        const controller = this.props.controller;

        return (
            <ButtonGroup toggle className="mb-2 input-button">
                <Button
                    variant="danger"
                    value="1"
                    onClick={() => controller.delete()}
                >
                    Delete
                </Button>
            </ButtonGroup>
        );
    }
}
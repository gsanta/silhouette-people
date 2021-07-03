import * as React from "react";
import { ButtonGroup, ToggleButton, Button, Dropdown } from "react-bootstrap";
import { GameObjectTag } from "../../model/objects/game_object/GameObject";
import { GameObjectController } from "../../service/editor/controllers/GameObjectController";

export class GameObjectPanel extends React.Component<{ controller: GameObjectController }> {

    constructor(props: {controller: GameObjectController}) {
        super(props);

        this.onTagSelect = this.onTagSelect.bind(this);
    }

    render() {
        if (!this.props.controller.gameObject) { return null; }

        return (

            <div className="panel">
                <div className="title-row">Game object</div>
                <div className="button-row">{this.renderCollisionToggle()}</div>
                <div className="panel-divider">tags</div>
                <div className="input-row">{this.renderTagsDropdown()}</div>
                <div className="button-row">{this.renderTags()}</div>
                <div className="panel-divider">delete game object</div>
                <div className="button-row">{this.renderRemoveButton()}</div>
            </div>  
        );
    }

    private renderTags() {
        const items: JSX.Element[] = [];
        this.props.controller.tags.forEach(tag => {
            const button = (
                <ButtonGroup toggle className="mb-2 input-button">
                    <Button
                        variant="danger"
                        value="1"
                        onClick={() => this.props.controller.deleteTag(tag)}
                    >
                        {tag}
                    </Button>
                </ButtonGroup>
            )
            items.push(button);
        });

        return items;
    }

    private renderTagsDropdown() {
        const items = GameObjectTag.getAllTags().map(tag => <Dropdown.Item eventKey={tag}>{tag}</Dropdown.Item>);


        return (
            <Dropdown className="dropdown-button" onSelect={this.onTagSelect}>
                <Dropdown.Toggle variant="secondary" id="dropdown-basic">
                    Select tag
                </Dropdown.Toggle>

                <Dropdown.Menu>
                    {items}
            </Dropdown.Menu>
            </Dropdown>
        )
    }

    private onTagSelect(eventKey: GameObjectTag) {
        this.props.controller.addTag(eventKey);
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
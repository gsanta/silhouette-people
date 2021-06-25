import * as React from "react";
import { Button, ButtonGroup } from "react-bootstrap";
import { SceneExportController } from "../../service/editor/controllers/SceneExportController";

export class SceneExportPanel extends React.Component<{ sceneExportController: SceneExportController }> {

    render() {
        return (
            <div className="panel">
                <div className="title-row">Scene Export</div>
                <div className="button-row">{this.renderButton()}</div>
            </div>  
        );
    }


    renderButton() {
        const sceneExportController = this.props.sceneExportController;
        
        return (
            <ButtonGroup toggle className="mb-2 input-button">
                <Button
                    type="checkbox"
                    variant="secondary"
                    value="1"
                    onClick={() => sceneExportController.export()}
                >
                    Export
                </Button>
            </ButtonGroup>

        )
    }
}
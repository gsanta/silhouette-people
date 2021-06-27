import * as React from "react";
import { ButtonGroup, ToggleButton } from "react-bootstrap";
import { ToolController } from "../../service/editor/controllers/ToolController";
import { Tool } from "../../service/editor/tools/Tool";
import { TransformTool } from "../../service/editor/tools/TransformTool";

export class ToolPanel extends React.Component<{ toolController: ToolController }> {

    render() {
        const buttons = this.props.toolController.tools.map(name => this.renderButton(name));

        return (

            <div className="panel">
                <div className="title-row">Tools</div>
                <div className="button-row">{buttons}</div>
            </div>  
        );
    }

    private renderButton(tool: Tool) {
        const toolController = this.props.toolController;

        return (
            <ButtonGroup toggle className="mb-2 input-button">
                <ToggleButton
                    type="checkbox"
                    variant="secondary"
                    checked={toolController.activeTool === tool}
                    value="1"
                    onChange={() => toolController.activeTool === tool ? toolController.activeTool = undefined : toolController.activeTool = tool}
                >
                    {tool.toolType}
                </ToggleButton>
            </ButtonGroup>

        )
    }
}
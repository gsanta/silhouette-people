import React from "react";
import { Tool, ToolType } from "../service/edit/Tool";
import { InjectProperty } from "../di/diDecorators";
import { lookup } from "../service/Lookup";
import { ToolService } from "../service/edit/ToolService";

export class CombatControllerComponent extends React.Component {

    @InjectProperty("ToolService")
    private toolService: ToolService;

    constructor(props: {}) {
        super(props);
        this.toolService = lookup.toolService;
    }

    render() {
        return (
            <div className="action-panel">
                <div className="action-panel-header">Combat control</div>
                <div className="action-panel-body">
                    {this.renderButton()}
                </div>
            </div>
        );
    }

    private renderButton() {
        const selectedTool = this.toolService.getSelectedTool();

        if(!selectedTool) { return null; }

        switch(selectedTool.type) {
            case ToolType.PATH:
                return this.renderActionButton('Draw Path', selectedTool);
            case ToolType.MOVE:
                return this.renderActionButton('Execute turn', selectedTool);
        }
    }

    private renderActionButton(text: string, tool: Tool) {
        let className = 'button-action' 

        if (!tool.isCanceled()) {
            className = `${className} button-action-active`;
        }

        return (
            <div className="info-row" onClick={() => this.resetToolIfCanceled(tool)}>
                <div className={className}>{text}</div>
            </div>
        );
    }

    private resetToolIfCanceled(tool: Tool) {
        if (tool.isCanceled()) {
            tool.reset();
        }
    }
}

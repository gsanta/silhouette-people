import React from "react";
import { InjectProperty } from "../di/diDecorators";
import { GameMode, GameModeService } from "../services/GameModeService";
import { lookup } from "../services/Lookup";
import { ToolService } from "../services/ToolService";
import { TurnBasedCommandService } from "../services/TurnBasedCommandService";
import { MeshStore } from "../stores/MeshStore";
import { Tool, ToolType } from "../controllers/Tool";
import { PathTool } from "../controllers/PathTool";

export class CombatControllerComponent extends React.Component {

    @InjectProperty("MeshStore")
    private meshStore: MeshStore;

    @InjectProperty("GameModeService")
    private gameModeService: GameModeService;

    @InjectProperty("ToolService")
    private toolService: ToolService;

    constructor(props: {}) {
        super(props);
        this.meshStore = lookup.meshStore;
        this.gameModeService = lookup.gameMode;
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

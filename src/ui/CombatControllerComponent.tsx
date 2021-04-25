import React from "react";
import { InjectProperty } from "../di/diDecorators";
import { GameMode, GameModeService } from "../services/GameModeService";
import { lookup } from "../services/Lookup";
import { ToolService } from "../services/ToolService";
import { TurnBasedCommandService } from "../services/TurnBasedCommandService";
import { MeshStore } from "../stores/MeshStore";
import { ToolType } from "../controllers/Tool";

export class CombatControllerComponent extends React.Component {

    @InjectProperty("MeshStore")
    private meshStore: MeshStore;

    @InjectProperty("GameModeService")
    private gameModeService: GameModeService;

    @InjectProperty("TurnBasedCommandService")
    private turnBasedCommandService: TurnBasedCommandService;

    @InjectProperty("ToolService")
    private toolService: ToolService;

    constructor(props: {}) {
        super(props);
        this.meshStore = lookup.meshStore;
        this.gameModeService = lookup.gameMode;
        this.toolService = lookup.toolService;
        this.turnBasedCommandService = lookup.turnBasedCommandService;
    }

    render() {
        if (this.gameModeService.gameMode !== GameMode.TURN_BASED) {
            return null;
        }

        return (
            <div className="action-panel">
                <div className="action-panel-header">Combat control</div>
                <div className="action-panel-body">
                    {/* <div className="info-row">
                        <button onClick={() => this.onClick()}>Start</button>
                    </div> */}
                    {this.renderDrawPathButton()}
                </div>
            </div>
        );
    }

    private renderDrawPathButton() {
        let className = 'button-action' 

        const selectedTool = this.toolService.getSelectedTool();
        if (selectedTool && selectedTool.type === ToolType.PATH) {
            className = `${className} button-action-active`;
        }

        return (
            <div className="info-row" onClick={() => this.selectPathTool()}>
                <div className={className}>Draw Path</div>
                {/* <button onClick={() => this.selectPathTool()}>Path</button> */}
            </div>
        )
    }

    private onClick() {
        this.turnBasedCommandService.executeTurn();
    }

    private selectPathTool() {
        this.toolService.setSelectedTool(this.toolService.path);
    }
}

import React from "react";
import { InjectProperty } from "../di/diDecorators";
import { GameMode, GameModeService } from "../services/GameModeService";
import { lookup } from "../services/Lookup";
import { ToolService } from "../services/ToolService";
import { TurnBasedCommandService } from "../services/TurnBasedCommandService";
import { MeshStore } from "../stores/MeshStore";

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
            <div className="bike-panel">
                <div className="info-panel-header">Combat control</div>
                <div className="info-panel-body">
                    <div className="info-row">
                        <button onClick={() => this.onClick()}>Start</button>
                    </div>
                    <div className="info-row">
                        <button onClick={() => this.selectPathTool()}>Path</button>
                    </div>
                </div>
            </div>
        );
    }

    private onClick() {
        this.turnBasedCommandService.executeTurn();
    }

    private selectPathTool() {
        this.toolService.setSelectedTool(this.toolService.path);
    }
}

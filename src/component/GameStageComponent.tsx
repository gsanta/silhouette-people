import React from "react";
import { Tool, ToolType } from "../service/edit/Tool";
import { InjectProperty } from "../di/diDecorators";
import { lookup } from "../service/Lookup";
import { ToolService } from "../service/edit/ToolService";
import { Vector2 } from "babylonjs";
import { StageController } from "../service/ui/stage/StageController";
import { GameStage, StepState } from "../service/ui/stage/GameStage";

export class GameStageComponent extends React.Component {

    @InjectProperty("ToolService")
    private toolService: ToolService;

    @InjectProperty("StageController")
    private stageController: StageController;

    private rotationStartPos = new Vector2(150, 22.5);
    private rotationCenter = new Vector2(150, 150);

    constructor(props: {}) {
        super(props);
        this.toolService = lookup.toolService;
        this.stageController = lookup.stageController;
    }

    render() {
        const origPos = new Vector2(150, 22.5);
        
        const rotation1 = 15 / 180 * Math.PI;
        const rotPos = this.computeRotation(origPos, rotation1);

        const stages = this.stageController.stages.map((stage, index) => this.renderStage(stage, index));

        return (
            // <div className="action-panel">
            //     <div className="action-panel-header">Combat control</div>
            //     <div className="action-panel-body">
            //         {this.renderButton()}
            //     </div>
            // </div>

            <div className="action-panel">
                <svg className="circle-controller">
                    <circle cx="150" cy="150" r="140" fill="red" />
                    <circle cx="150" cy="150" r="115" fill="black" />

                    {stages}
                    {/* <circle cx="150" cy="22.5" r="12" fill="black" />
                    <circle cx={rotPos.x} cy={rotPos.y} r="12" fill="black" /> */}
                </svg>
            </div>
        );
    }

    private renderStage(stage: GameStage, index: number) {
        const positions = this.getStepPositions(stage, index);
        const steps = stage.getStepDescription().steps;

        
        return steps.map((step, index) => {
            let fill = 'white';
            let animate: JSX.Element = null;

            if (step.state === StepState.Defined) {
                fill = 'green';
            } else if (step.state === StepState.Pending) {
                animate = <animate attributeName="fill" values="white;blue;white" dur="2s" repeatCount="indefinite" />
                fill = 'blue';
            }

            const position = positions[index];
            return (
                <circle className="button-step" cx={position.x} cy={position.y} r="12" fill={fill}>
                    {animate}
                </circle>
            );
        });
    }

    private getStepPositions(stage: GameStage, index: number): Vector2[] {
        const baseRotation = index * (Math.PI / 2);
        const steps = stage.getStepDescription().steps;
        const offset = steps.length % 2 ? 0 : Math.PI / 16;
        const startRotation = baseRotation - Math.PI / 8 * Math.floor(steps.length / 2) + offset;

        return steps.map((step, index) => this.createStep(startRotation + index * Math.PI / 8));
    }

    private createStep(rotation: number): Vector2 {
        const origPos = this.rotationStartPos;
        const rotCenter = this.rotationCenter;
        
        const xRot = Math.cos(rotation) * (origPos.x - rotCenter.x) - Math.sin(rotation) * (origPos.y - rotCenter.y) + rotCenter.x;
        const yRot = Math.sin(rotation) * (origPos.x - rotCenter.x) + Math.cos(rotation) * (origPos.y - rotCenter.y) + rotCenter.y;

        return new Vector2(xRot, yRot);
    }

    private computeRotation(origPos: Vector2, rotation: number): Vector2 {
        const rotCenter = new Vector2(150, 150);

        const xRot = Math.cos(rotation) * (origPos.x - rotCenter.x) - Math.sin(rotation) * (origPos.y - rotCenter.y) + rotCenter.x;
        const yRot = Math.sin(rotation) * (origPos.x - rotCenter.x) + Math.cos(rotation) * (origPos.y - rotCenter.y) + rotCenter.y;

        return new Vector2(xRot, yRot);
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
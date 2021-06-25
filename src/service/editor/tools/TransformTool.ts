import { ToolType } from "../controllers/TransformController";
import { GizmoManagerAdapter } from "./GizmoManagerAdapter";

export class TransformTool {

    private readonly gizmoManagerAdapter: GizmoManagerAdapter;
    readonly toolType: ToolType;

    constructor(gizmoManagerAdapter: GizmoManagerAdapter, toolType: ToolType) {
        this.gizmoManagerAdapter = gizmoManagerAdapter;

        this.toolType = toolType;
    }

    deselect() {
        this.diableGizmos();
    }

    select() {
        this.diableGizmos();
        if (this.toolType === ToolType.TRANSFORM) {
            this.gizmoManagerAdapter.manager.positionGizmoEnabled = true;
    } else if (this.toolType === ToolType.ROTATE) {
            this.gizmoManagerAdapter.manager.rotationGizmoEnabled = true;
        }
    }

    private diableGizmos() {
        this.gizmoManagerAdapter.manager.positionGizmoEnabled = false;
        this.gizmoManagerAdapter.manager.rotationGizmoEnabled = false;
    }
}
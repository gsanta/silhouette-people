import { EventService } from "../../EventService";
import { SceneService } from "../../SceneService";
import { ToolType } from "../controllers/TransformController";
import { GizmoManagerAdapter } from "./GizmoManagerAdapter";
import { Tool } from "./Tool";

export class TransformTool extends Tool {
    private readonly gizmoManagerAdapter: GizmoManagerAdapter;
    private readonly eventService: EventService;

    constructor(gizmoManagerAdapter: GizmoManagerAdapter, eventService: EventService, sceneService: SceneService, toolType: ToolType) {
        super(sceneService, toolType);
        this.gizmoManagerAdapter = gizmoManagerAdapter;
        this.eventService = eventService;
        this.onGameObjectDeleted = this.onGameObjectDeleted.bind(this);

        this.eventService.guiEvents.onGameObjectDeleted(this.onGameObjectDeleted);
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
            this.gizmoManagerAdapter.manager.gizmos.rotationGizmo.updateGizmoRotationToMatchAttachedMesh = true;
        }
    }

    private diableGizmos() {
        this.gizmoManagerAdapter.manager.positionGizmoEnabled = false;
        this.gizmoManagerAdapter.manager.rotationGizmoEnabled = false;
    }

    private onGameObjectDeleted() {
        this.gizmoManagerAdapter.manager.attachToMesh(null);
    }
}
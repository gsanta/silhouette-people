import { Vector2, Vector3 } from "babylonjs";
import { PointerInfo } from "babylonjs/Events/pointerEvents";
import { InjectProperty } from "../../../di/diDecorators";
import { WorldProvider } from "../../WorldProvider";
import { lookup } from "../../Lookup";
import { ToolService } from "../../edit/ToolService";

export enum MouseButtonType {
    LEFT = 'LEFT',
    MIDDLE = 'MIDDLE',
    RIGHT = 'RIGHT'
}

export class PointerData {
    down: Vector3;
    down2D: Vector2;
    curr: Vector3;
    curr2D: Vector2;
    buttonType: MouseButtonType;
}

export class PointerService {
    pointer: PointerData;

    @InjectProperty("WorldProvider")
    private worldProvider: WorldProvider;

    @InjectProperty("ToolService")
    private toolService: ToolService;

    constructor() {
        this.pointer = new PointerData();
        this.worldProvider = lookup.worldProvider;
        this.toolService = lookup.toolService;
    }

    listen() {
        const { world } = this.worldProvider;

        world.scene.onPointerObservable.add((pointerInfo) => {
            switch (pointerInfo.type) {
                case BABYLON.PointerEventTypes.POINTERDOWN:
                    this.pointerDown(pointerInfo);
                break;
                case BABYLON.PointerEventTypes.POINTERMOVE:
                    this.pointerMove(pointerInfo);
                break;
            }
        });
    }

    pointerDown(info: PointerInfo) {
        this.updatePointerData(info, { isDown: true });

        if (this.toolService.getSelectedTool()) {
            this.toolService.getSelectedTool().pointerDown(this.pointer);
        }
    }

    pointerMove(info: PointerInfo) {
        this.updatePointerData(info, { isDown: false });

        if (this.toolService.getSelectedTool()) {
            this.toolService.getSelectedTool().pointerMove(this.pointer);
        }
    }

    private updatePointerData(info: PointerInfo, eventInfo: { isDown: boolean }) {
        const curr = this.worldProvider.world.camera.screenToCanvasPoint(new Vector2(info.event.clientX, info.event.clientY));
        const curr2D = new Vector2(curr.x, curr.z);

        if (eventInfo.isDown) {
            this.pointer.down = curr;
            this.pointer.down2D = curr2D;
        } else {
            this.pointer.curr = curr;
            this.pointer.curr2D = curr2D;
        }

        switch(info.event.button) {
            case 0:
                this.pointer.buttonType = MouseButtonType.LEFT;
            break;
            case 1:
                this.pointer.buttonType = MouseButtonType.MIDDLE;
            break;
            case 2:
                this.pointer.buttonType = MouseButtonType.RIGHT;
            break;
        }
    } 
}
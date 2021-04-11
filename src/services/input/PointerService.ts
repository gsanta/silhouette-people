import { Vector2, Vector3 } from "babylonjs";
import { PointerInfo } from "babylonjs/Events/pointerEvents";
import { InjectProperty } from "../../di/diDecorators";
import { TileStore } from "../../stores/TileStore";
import { WorldProvider } from "../WorldProvider";
import { lookup } from "../Lookup";

export class PointerService {    
    down: Vector3;

    @InjectProperty("WorldProvider")
    private worldProvider: WorldProvider;

    @InjectProperty("TileStore")
    private tileStore: TileStore;

    constructor() {
        this.worldProvider = lookup.worldProvider;
        this.tileStore = lookup.tileStore;
    }

    listen() {
        const { world } = this.worldProvider;

        world.scene.onPointerObservable.add((pointerInfo) => {
            switch (pointerInfo.type) {
                case BABYLON.PointerEventTypes.POINTERDOWN:
                    this.pointerDown(pointerInfo);
                    break;
            }
        });
    }

    pointerDown(info: PointerInfo) {
        this.down = this.worldProvider.world.camera.screenToCanvasPoint(new Vector2(info.event.clientX, info.event.clientY));
        // console.log(this.down.toString());
        this.tileStore.getTileByWorldPos(new Vector2(this.down.x, this.down.y));
    }
}
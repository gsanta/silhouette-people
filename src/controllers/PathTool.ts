import { Mesh } from "babylonjs";
import { Path } from "../model/general/objs/Path";
import { MeshState } from "../model/general/state/MeshState";
import { PointerData } from "../services/input/PointerService";
import { lookup } from "../services/Lookup";
import { WorldProvider } from "../services/WorldProvider";
import { MaterialStore } from "../stores/MaterialStore";
import { MeshStore } from "../stores/MeshStore";
import { PathBuilder } from "./PathBuilder";
import { PathVisualizer } from "./PathVisualizer";
import { Tool } from "./Tool";

export class PathTool implements Tool {
    private meshStore: MeshStore;
    private pathVisualizer: PathVisualizer;
    private pathBuilder: PathBuilder;
    
    private path: Path;
    private ribbon: Mesh;


    constructor(worldProvider: WorldProvider, materialStore: MaterialStore, meshStore: MeshStore) {
        this.meshStore = lookup.meshStore;
        this.pathVisualizer = new PathVisualizer(worldProvider, materialStore);
        this.pathBuilder = new PathBuilder();
    }

    pointerMove(pointer: PointerData) {
        if (this.path) {
            this.path = this.pathBuilder.updatePath(this.path, pointer.curr2D);
            this.ribbon = this.pathVisualizer.visualize(this.path, this.ribbon);
        }
    }

    pointerDown(pointer: PointerData) {
        if (!this.path) {
            this.path = this.pathBuilder.startPath(pointer.curr2D);
        } else {
            this.path = this.pathBuilder.closePath(this.path, pointer.curr2D);
            if (this.ribbon) {
                this.ribbon.dispose();
            }
            this.path = undefined;
        }
    }

    select() {
        const player = this.meshStore.getActivePlayer();
        this.path = this.pathBuilder.startPath(player.getPosition2D());
    }
}

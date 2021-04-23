import { Mesh, Vector2, Vector3 } from "babylonjs";
import { PointerData } from "../services/input/PointerService";
import { WorldProvider } from "../services/WorldProvider";
import { MaterialStore } from "../stores/MaterialStore";
import { PathVisualizer } from "./PathVisualizer";


export class PathTool {
    private pathVisualizer: PathVisualizer;
    private path: Vector3[];
    private ribbon: Mesh;
    private angle: number;

    constructor(worldProvider: WorldProvider, materialStore: MaterialStore) {
        this.pathVisualizer = new PathVisualizer(worldProvider, materialStore);
    }

    pointerMove(pointer: PointerData) {
        
        if (this.path) {
            this.updatePath(pointer.curr2D);
            this.ribbon = this.pathVisualizer.visualize(this.path, this.ribbon);
        }
    }

    pointerDown(pointer: PointerData) {
        if (!this.path) {
            this.startPath(pointer.curr2D)
        } else {
            this.closePath(pointer.curr2D);
            if (this.ribbon) {
                this.ribbon.dispose();
            }
            this.path = undefined;
        }
    }

    private updatePath(pos: Vector2) {
        this.path[1] = new Vector3(pos.x, 0.5, pos.y);
    }

    private startPath(pos: Vector2) {
        this.path = [new Vector3(pos.x, 0.5, pos.y)]
    }

    private closePath(pos: Vector2) {
        this.path.push(new Vector3(pos.x, 0.5, pos.y));
    }
}
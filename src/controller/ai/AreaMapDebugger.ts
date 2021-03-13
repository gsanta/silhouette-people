import { Matrix, Mesh, MeshBuilder, Space, StandardMaterial, Vector3 } from "babylonjs";
import { World } from "../../model/World";
import { AreaMap } from "./AreaMap";

export interface AreaVisualizerConfig {
    height: number;
}

export class AreaMapDebugger {
    private world: World;
    private baseInstance: Mesh;
    private config: AreaVisualizerConfig;

    constructor(world: World) {
        this.world = world;
    }

    visualize(config: AreaVisualizerConfig, areaMap: AreaMap) {
        this.config = config;
        const cubeSize = areaMap.gridSize - 0.1;
        this.baseInstance = MeshBuilder.CreateBox(`grid-base-instance`, { width: cubeSize, height: cubeSize, depth: cubeSize});
        this.baseInstance.thinInstanceRegisterAttribute("color", 4);


        for (let i = 0; i < areaMap.rows; i++) {
            for (let j = 0; j < areaMap.columns; j++) {
                this.createMeshAtGridPos(areaMap, i, j);
            }
        }
    }

    private createMeshAtGridPos(areaMap: AreaMap, row: number, col: number) {
        const index = row * areaMap.columns + col;

        const worldPos = areaMap.getWorldCoordinate(index);
        var matrix = Matrix.Translation(worldPos.x, this.config.height, worldPos.y);

        var idx = this.baseInstance.thinInstanceAdd(matrix);

        if (areaMap.isBlocked(index)) {
            this.baseInstance.thinInstanceSetAttributeAt("color", idx, [1, 0, 0, 1]);
        } else {
            this.baseInstance.thinInstanceSetAttributeAt("color", idx, [0.5, 0.5, 0.5, 1]);
        }
    }
}
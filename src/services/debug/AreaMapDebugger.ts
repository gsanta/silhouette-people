import { Axis, Mesh, MeshBuilder, Space, Vector3, InstancedMesh, Color4 } from "babylonjs";
import { World } from "../../model/World";

export interface AreaVisualizerConfig {
    height: number;
}

export class AreaMapDebugger {
    private world: World;
    private baseInstance: Mesh;
    private config: AreaVisualizerConfig;
    private instanceMap: Map<number, InstancedMesh> = new Map();
    private borderMeshes: Mesh[] = [];

    constructor(world: World) {
        this.world = world;
    }

    update(config: AreaVisualizerConfig) {
        const areaMap = this.world.ai.areaMap;
        this.config = config;
        this.createBaseInstanceIfNeeded();
        this.createBorderIfNeeded();

        for (let i = 0; i < areaMap.rows; i++) {
            for (let j = 0; j < areaMap.columns; j++) {
                const index = i * areaMap.columns + j;
                this.createMeshOrUpdateMeshAtIndex(index);
            }
        }
    }

    clear() {
        if (!this.baseInstance) { return; }

        this.baseInstance.dispose();
        this.instanceMap = new Map();
        this.baseInstance = undefined;
        this.borderMeshes.forEach(mesh => mesh.dispose());
        this.borderMeshes = [];
    }

    private createBorderIfNeeded() {
        if (this.borderMeshes.length > 0) { return; }

        const bounds = this.world.ai.areaMap.getWorldBounds();
        const border1 = MeshBuilder.CreateGround(`border-1`, { width: 0.1, height: bounds.getHeight() });
        border1.translate(Axis.Z, -bounds.getHeight() / 2, Space.WORLD);
        
        const border2 = MeshBuilder.CreateGround(`border-2`, { width: bounds.getWidth(), height: 0.1 });
        border2.translate(Axis.X, bounds.getWidth() / 2, Space.WORLD);

        const border3 = MeshBuilder.CreateGround(`border-3`, { width: bounds.getWidth(), height: 0.1 });
        border3.translate(Axis.X, bounds.getWidth() / 2, Space.WORLD);
        border3.translate(Axis.Z, -bounds.getHeight(), Space.WORLD);

        const border4 = MeshBuilder.CreateGround(`border-4`, { width: 0.1, height: bounds.getHeight() });
        border4.translate(Axis.X, bounds.getWidth(), Space.WORLD);
        border4.translate(Axis.Z, -bounds.getHeight() / 2, Space.WORLD);

        this.borderMeshes.push(border1, border2, border3, border4);
    }

    private createBaseInstanceIfNeeded() {
        if (this.baseInstance) { return; }

        const areaMap = this.world.ai.areaMap;

        const cubeSize = areaMap.gridSize - 0.1;
        this.baseInstance = MeshBuilder.CreateGround(`grid-base-instance`, { width: cubeSize, height: cubeSize });
        this.baseInstance.registerInstancedBuffer("color", 4);

        this.baseInstance.isVisible = false;
    }

    private createMeshOrUpdateMeshAtIndex(index: number) {
        const areaMap = this.world.ai.areaMap;

        if (!areaMap.getNum(index)) {
            this.removeMesh(index);
        } else if (!this.instanceMap.get(index)) {
            this.createMesh(index);
        } else {
            this.updateColor(index);
        }
    }

    private removeMesh(index: number) {
        if (this.instanceMap.has(index)) {
            this.instanceMap.get(index).dispose();
            this.instanceMap.delete(index);
        }
    }

    private createMesh(index: number) {
        const areaMap = this.world.ai.areaMap;

        const worldPos = areaMap.getWorldCoordinate(index);
        const instance = this.baseInstance.createInstance(index + '');
        instance.translate(new Vector3(worldPos.x, this.config.height, worldPos.y), 1, Space.WORLD);

        this.instanceMap.set(index, instance);
        this.updateColor(index);

    }

    private updateColor(index: number) {
        const areaMap = this.world.ai.areaMap;

        const instance = this.instanceMap.get(index);
        if (areaMap.getNum(index) === 1) {
            instance.instancedBuffers.color = new Color4(1, 0, 0, 1);
        } else if (areaMap.getNum(index) === 2) {
            instance.instancedBuffers.color = new Color4(0, 0, 1, 1);
        } else {
            instance.instancedBuffers.color = new Color4(0.5, 0.5, 0.5, 1);
        }
    }
}
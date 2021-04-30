import { StandardMaterial, Axis, Mesh, MeshBuilder, Space, Vector3, InstancedMesh, Color4, Color3 } from "babylonjs";
import { InjectProperty } from "../../../di/diDecorators";
import { lookup, Lookup } from "../../Lookup";
import { QuarterStore } from "../../../stores/QuarterStore";
import { WorldProvider } from "../../object/world/WorldProvider";

export interface AreaVisualizerConfig {
    height: number;
}

export class QuarterMapDebugger {
    private baseInstance: Mesh;
    private instanceMap: Map<number, InstancedMesh> = new Map();
    private borderMeshes: Mesh[] = [];
    private height: number = 0.5;

    private visible = false;

    @InjectProperty("WorldProvider")
    private worldProvider: WorldProvider;

    @InjectProperty("QuarterStore")
    private quarterStore: QuarterStore;

    constructor() {
        this.worldProvider = lookup.worldProvider;
        this.quarterStore = lookup.quarterStore;
    }


    setHeight(height: number) {
        this.height = height;
    }

    isVisible() {
        return this.visible;
    }

    show() {
        this.visible = true;
        this.update();
    }

    hide() {
        this.visible = false;
        this.clear();
    }

    update() {
        const quarterMap = this.quarterStore.getQuarter(1).getMap();
        this.createBaseInstanceIfNeeded();
        this.createBorderIfNeeded();

        for (let i = 0; i < quarterMap.rows; i++) {
            for (let j = 0; j < quarterMap.columns; j++) {
                const index = i * quarterMap.columns + j;
                this.createMeshOrUpdateMeshAtIndex(index);
            }
        }
    }

    private clear() {
        if (!this.baseInstance) { return; }

        Array.from(this.instanceMap.values()).forEach(val => val.dispose());
        this.instanceMap = new Map();
        this.baseInstance.dispose();
        this.baseInstance = undefined;
        this.borderMeshes.forEach(mesh => mesh.dispose());
        this.borderMeshes = [];
    }

    private createBorderIfNeeded() {
        const { world } = this.worldProvider;

        if (this.borderMeshes.length > 0) { return; }
        const quarterMap = this.quarterStore.getQuarter(1).getMap();

        const material = new StandardMaterial('border-material', world.scene);
        material.diffuseColor = Color3.Yellow();

        const bounds = quarterMap.getWorldBounds();
        const border1 = MeshBuilder.CreateGround(`border-1`, { width: 0.1, height: bounds.getHeight() });
        border1.translate(Axis.Z, -bounds.getHeight() / 2, Space.WORLD);
        border1.translate(Axis.Y, this.height, Space.WORLD);
        border1.material = material;
        
        const border2 = MeshBuilder.CreateGround(`border-2`, { width: bounds.getWidth(), height: 0.1 });
        border2.translate(Axis.X, bounds.getWidth() / 2, Space.WORLD);
        border2.translate(Axis.Y, this.height, Space.WORLD);
        border2.material = material;

        const border3 = MeshBuilder.CreateGround(`border-3`, { width: bounds.getWidth(), height: 0.1 });
        border3.translate(Axis.X, bounds.getWidth() / 2, Space.WORLD);
        border3.translate(Axis.Z, -bounds.getHeight(), Space.WORLD);
        border3.translate(Axis.Y, this.height, Space.WORLD);
        border3.material = material;

        const border4 = MeshBuilder.CreateGround(`border-4`, { width: 0.1, height: bounds.getHeight() });
        border4.translate(Axis.X, bounds.getWidth(), Space.WORLD);
        border4.translate(Axis.Z, -bounds.getHeight() / 2, Space.WORLD);
        border4.translate(Axis.Y, this.height, Space.WORLD);
        border4.material = material;

        this.borderMeshes.push(border1, border2, border3, border4);
    }

    private createBaseInstanceIfNeeded() {
        if (this.baseInstance) { return; }
        const quarterMap = this.quarterStore.getQuarter(1).getMap();

        const cubeSize = quarterMap.gridSize - 0.1;
        this.baseInstance = MeshBuilder.CreateGround(`grid-base-instance`, { width: cubeSize, height: cubeSize });
        this.baseInstance.registerInstancedBuffer("color", 4);

        this.baseInstance.isVisible = false;
    }

    private createMeshOrUpdateMeshAtIndex(index: number) {
        const quarterMap = this.quarterStore.getQuarter(1).getMap();

        if (!quarterMap.getNum(index)) {
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
        const quarterMap = this.quarterStore.getQuarter(1).getMap();

        const worldPos = quarterMap.getWorldCoordinate(index);
        const instance = this.baseInstance.createInstance(index + '');
        instance.translate(new Vector3(worldPos.x, this.height, worldPos.y), 1, Space.WORLD);

        this.instanceMap.set(index, instance);
        this.updateColor(index);

    }

    private updateColor(index: number) {
        const quarterMap = this.quarterStore.getQuarter(1).getMap();

        const instance = this.instanceMap.get(index);
        if (quarterMap.getNum(index) === 1) {
            instance.instancedBuffers.color = new Color4(1, 0, 0, 1);
        } else if (quarterMap.getNum(index) === 2) {
            instance.instancedBuffers.color = new Color4(0, 0, 1, 1);
        } else {
            instance.instancedBuffers.color = new Color4(0.5, 0.5, 0.5, 1);
        }
    }
}
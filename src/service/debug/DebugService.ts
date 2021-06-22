import { AdvancedDynamicTexture } from "babylonjs-gui";
import { CitizenStore } from "../../store/CitizenStore";
import { MaterialStore } from "../../store/MaterialStore";
import { GameObjectStore } from "../../store/GameObjectStore";
import { WorldProvider } from "../WorldProvider";
import { IGUIComponent } from "./IGUIComponent";
import { QuarterMapDebugger } from "./QuarterMapDebugger";
import { WorldAxisHelper } from "./WorldAxisHelper";
import { Vector3 } from "babylonjs";

export class DebugService {
    private worldAxisHelper: WorldAxisHelper;
    private texture: AdvancedDynamicTexture;
    areaMapDebugger: QuarterMapDebugger;
    
    private readonly meshStore: GameObjectStore;
    private readonly worldProvider: WorldProvider;
    private readonly materialStore: MaterialStore;
    private readonly citizenStore: CitizenStore;

    private guiComponents: IGUIComponent[] = [];

    constructor(meshStore: GameObjectStore, worldProvider: WorldProvider, materialStore: MaterialStore, citizenStore: CitizenStore) {
        this.meshStore = meshStore;
        this.worldProvider = worldProvider;
        this.materialStore = materialStore;
        this.citizenStore = citizenStore;
        this.worldAxisHelper = new WorldAxisHelper();
        this.areaMapDebugger = new QuarterMapDebugger();
    }

    addGuiComponent(component: IGUIComponent) {
        this.guiComponents.push(component);
    }

    render() {
        if (!this.texture) {
            this.texture = AdvancedDynamicTexture.CreateFullscreenUI("UI");
        }
        this.guiComponents.forEach(comp => comp.render(this.texture));
    }

    setWorldAxisVisibility(isVisible: boolean, yPos: number = 1) {
        isVisible ? this.worldAxisHelper.show(yPos) : this.worldAxisHelper.hide();
    }

    setColliderMeshVisibility(isVisible: boolean) {
        this.meshStore.getAll().forEach(meshObj =>  meshObj.collisionMesh && (meshObj.collisionMesh.showBoundingBox = isVisible));
    }

    setMeshBoundingBoxVisibility(isVisible: boolean) {
        this.meshStore.getAll().forEach(meshObj =>  meshObj.collisionMesh && (meshObj.collisionMesh.showBoundingBox = isVisible));
    }

    applyImpulse() {
        this.meshStore.getById('bicycle1-0').mesh.physicsImpostor.applyImpulse(new Vector3(1, 1, 0), new Vector3(0, 0.3, 0));
    }
}
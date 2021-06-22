import { GizmoManager, Mesh, MeshBuilder } from "babylonjs";
import { GameObjectStore } from "../../store/GameObjectStore";
import { MeshStore } from "../../store/MeshStore";
import { KeyboardService, KeyName } from "../input/KeyboardService";
import { WorldProvider } from "../WorldProvider";

export class TransformTool {
    private readonly gameObjectStore: GameObjectStore;
    private readonly worldProvider: WorldProvider;
    private readonly meshStore: MeshStore;
    private readonly keyboardService: KeyboardService;
    private gizmoManager: GizmoManager;
    private programmaticEvent = false;

    constructor(worldProvider: WorldProvider, gameObjectStore: GameObjectStore, meshStore: MeshStore, keyboardService: KeyboardService) {
        this.worldProvider = worldProvider;
        this.gameObjectStore = gameObjectStore;
        this.meshStore = meshStore;
        this.keyboardService = keyboardService;
        this.onKeyDown = this.onKeyDown.bind(this);

        this.keyboardService.onKeydown(this.onKeyDown)
    }

    updateAttachableMeshes() {
        this.gizmoManager = new GizmoManager(this.worldProvider.scene);
        this.gizmoManager.positionGizmoEnabled = true;

        const attachableMeshes: Mesh[] = [];

        this.gameObjectStore.getAll().forEach(gameObject => {
            if (gameObject.dimensionalMesh) {
                gameObject.meshes.forEach(mesh => attachableMeshes.push(<Mesh> gameObject.dimensionalMesh));
            }
        });

        const testMesh = MeshBuilder.CreateBox('test-mesh', { size: 3 }, this.worldProvider.scene);
        testMesh.position.y = 3;

        this.gizmoManager.attachableMeshes = attachableMeshes;

        this.gizmoManager.onAttachedToMeshObservable.add((mesh: Mesh) => {

            if (!this.programmaticEvent) {
                if (this.meshStore.getGameObject(mesh).collisionMesh) {
                    this.programmaticEvent = true;
                    this.gizmoManager.attachToMesh(this.meshStore.getGameObject(mesh).collisionMesh);
                }
            } else {
                this.programmaticEvent = false;
            }
        });
    }

    private onKeyDown(keyName: KeyName) {
        if (keyName === KeyName.T) {
            this.gizmoManager.positionGizmoEnabled = false;
            this.gizmoManager.rotationGizmoEnabled = true;
        }
    }
}
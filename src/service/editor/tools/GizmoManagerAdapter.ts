import { GizmoManager, Mesh, MeshBuilder } from "babylonjs";
import { GameObjectStore } from "../../../store/GameObjectStore";
import { MeshStore } from "../../../store/MeshStore";
import { SceneService } from "../../SceneService";

export class GizmoManagerAdapter {
    private readonly sceneService: SceneService;
    private readonly gameObjectStore: GameObjectStore;
    private readonly meshStore: MeshStore;
    private _gizmoManager: GizmoManager;
    private programmaticEvent = false;

    constructor(sceneService: SceneService, gameObjectStore: GameObjectStore, meshStore: MeshStore) {
        this.sceneService = sceneService;
        this.gameObjectStore = gameObjectStore;
        this.meshStore = meshStore;
    }

    get manager() {
        if (!this._gizmoManager) {
            this.initGizmoManager();
        }

        return this._gizmoManager;
    }

    private initGizmoManager() {
        this._gizmoManager = new GizmoManager(this.sceneService.scene);
        const attachableMeshes: Mesh[] = [];

        this.gameObjectStore.getAll().forEach(gameObject => {
            if (gameObject.dimensionalMesh) {
                gameObject.meshes.forEach(mesh => attachableMeshes.push(<Mesh> gameObject.dimensionalMesh));
            }
        });

        const testMesh = MeshBuilder.CreateBox('test-mesh', { size: 3 }, this.sceneService.scene);
        testMesh.position.y = 3;

        this._gizmoManager.attachableMeshes = attachableMeshes;

        this._gizmoManager.onAttachedToMeshObservable.add((mesh: Mesh) => {

            if (!this.programmaticEvent) {
                if (this.meshStore.getGameObject(mesh).collisionMesh) {
                    this.programmaticEvent = true;
                    this._gizmoManager.attachToMesh(this.meshStore.getGameObject(mesh).collisionMesh);
                }
            } else {
                this.programmaticEvent = false;
            }
        });
    }
}
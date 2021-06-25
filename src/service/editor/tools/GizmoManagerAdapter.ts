import { GizmoManager, Mesh, MeshBuilder } from "babylonjs";
import { GameObjectStore } from "../../../store/GameObjectStore";
import { MeshStore } from "../../../store/MeshStore";
import { EventService } from "../../EventService";
import { SceneService } from "../../SceneService";

export class GizmoManagerAdapter {
    private readonly sceneService: SceneService;
    private readonly gameObjectStore: GameObjectStore;
    private readonly meshStore: MeshStore;
    private readonly eventService: EventService;
    private _gizmoManager: GizmoManager;
    private programmaticEvent = false;

    constructor(sceneService: SceneService, gameObjectStore: GameObjectStore, meshStore: MeshStore, eventService: EventService) {
        this.sceneService = sceneService;
        this.gameObjectStore = gameObjectStore;
        this.meshStore = meshStore;
        this.eventService = eventService;
        this.onGameObjectLoaded = this.onGameObjectLoaded.bind(this);

        this.eventService.guiEvents.onGameObjectCreated(this.onGameObjectLoaded);
    }

    get manager() {
        if (!this._gizmoManager) {
            this.initGizmoManager();
        }

        return this._gizmoManager;
    }

    private initGizmoManager() {
        this._gizmoManager = new GizmoManager(this.sceneService.scene);

        // this._gizmoManager.attachableMeshes = this.getAttachableMeshes();

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

    private onGameObjectLoaded() {
        // this._gizmoManager.attachableMeshes = this.getAttachableMeshes();
    }

    private getAttachableMeshes(): Mesh[] {
        const meshes: Mesh[] = [];

        this.gameObjectStore.getAll().forEach(gameObject => {
            if (gameObject.dimensionalMesh) {
                meshes.push(<Mesh> gameObject.dimensionalMesh)
            }
        });

        return meshes;
    }
}
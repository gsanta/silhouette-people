import { GizmoManager, Mesh, MeshBuilder } from "babylonjs";
import { GameObjectStore } from "../../../store/GameObjectStore";
import { MeshStore } from "../../../store/MeshStore";
import { EventService } from "../../EventService";
import { SceneService } from "../../SceneService";
import { SelectionStore } from "../SelectionStore";

export class GizmoManagerAdapter {
    private readonly sceneService: SceneService;
    private readonly gameObjectStore: GameObjectStore;
    private readonly meshStore: MeshStore;
    private readonly eventService: EventService;
    private readonly selectionStore: SelectionStore;
    private _gizmoManager: GizmoManager;
    private programmaticEvent = false;

    constructor(sceneService: SceneService, gameObjectStore: GameObjectStore, meshStore: MeshStore, eventService: EventService, selectionStore: SelectionStore) {
        this.sceneService = sceneService;
        this.gameObjectStore = gameObjectStore;
        this.meshStore = meshStore;
        this.eventService = eventService;
        this.selectionStore = selectionStore;
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
                const gameObject = this.meshStore.getGameObject(mesh);
                if (gameObject.collisionMesh) {
                    this.programmaticEvent = true;
                    this._gizmoManager.attachToMesh(gameObject.collisionMesh);
                    this.eventService.guiEvents.emitGameObjectSelected(gameObject);
                    this.selectionStore.add(gameObject);
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
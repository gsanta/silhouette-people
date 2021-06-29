import { GizmoManager, Mesh } from "babylonjs";
import { MeshStore } from "../../../store/MeshStore";
import { EventService } from "../../EventService";
import { SceneService } from "../../SceneService";
import { SelectionStore } from "../SelectionStore";

export class GizmoManagerAdapter {
    private readonly sceneService: SceneService;
    private readonly meshStore: MeshStore;
    private readonly eventService: EventService;
    private readonly selectionStore: SelectionStore;
    private _gizmoManager: GizmoManager;
    private programmaticEvent = false;

    constructor(sceneService: SceneService, meshStore: MeshStore, eventService: EventService, selectionStore: SelectionStore) {
        this.sceneService = sceneService;
        this.meshStore = meshStore;
        this.eventService = eventService;
        this.selectionStore = selectionStore;
    }

    get manager() {
        if (!this._gizmoManager) {
            this.initGizmoManager();
        }

        return this._gizmoManager;
    }

    private initGizmoManager() {
        this._gizmoManager = new GizmoManager(this.sceneService.scene);

        this._gizmoManager.onAttachedToMeshObservable.add((mesh: Mesh) => {
            if (!this.programmaticEvent) {
                const gameObject = this.meshStore.getGameObject(mesh);
                if (gameObject.collisionMesh) {
                    this.programmaticEvent = true;
                    this._gizmoManager.attachToMesh(gameObject.collisionMesh);
                }
                if (gameObject) {
                    this.selectionStore.set(gameObject);
                    this.eventService.guiEvents.emitGameObjectSelected(gameObject);
                }
            } else {
                this.programmaticEvent = false;
            }
        });
    }
}
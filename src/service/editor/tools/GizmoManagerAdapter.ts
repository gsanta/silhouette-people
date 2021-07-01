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
    private filter: (mesh: Mesh) => boolean = () => true;
    private onAttachHandlers: ((mesh: Mesh) => void)[] = [];

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
            if (!mesh) { return; }

            if (!this.filter(mesh)) {
                this._gizmoManager.attachToMesh(null);
                this.onAttachHandlers.forEach(handler => handler(undefined));

            } else if (!this.programmaticEvent) {
                this.onAttachHandlers.forEach(handler => handler(mesh));
                
                const gameObject = this.meshStore.getGameObject(mesh);
                if (gameObject) {
                    if (gameObject.collisionMesh) {
                        this.programmaticEvent = true;
                        this._gizmoManager.attachToMesh(gameObject.collisionMesh);
                    }
                    this.selectionStore.set(gameObject);
                    this.eventService.guiEvents.emitGameObjectSelected(gameObject);
                }
            } else {
                this.programmaticEvent = false;
            }
        });
    }

    setMeshFilter(filter: (mesh: Mesh) => boolean) {
        this.filter = filter;
    }

    removeMeshFilter() {
        this.filter = () => true;
    }

    onAttach(handler: (mesh: Mesh) => void) {
        this.onAttachHandlers.push(handler);
    }

    removeOnAttach(handler: (mesh: Mesh) => void) {
        this.onAttachHandlers = this.onAttachHandlers.filter(h => h !== handler);
    }
}
import { GameObject } from "../../../model/objects/game_object/GameObject";
import { GameObjectStore } from "../../../store/GameObjectStore";
import { EventService } from "../../EventService";
import { CollisionCreator } from "../../import/parsers/CollisionCreator";
import { RenderGuiService } from "../../RenderGuiService";
import { DebugController } from "./DebugController";


export class GameObjectController {

    private readonly collisionCreator: CollisionCreator;
    private readonly renderGuiServic: RenderGuiService;
    private readonly eventService: EventService;
    private readonly debugController: DebugController;
    private readonly gameObjectStore: GameObjectStore;

    private _gameObject: GameObject;

    constructor(collisionCreator: CollisionCreator, renderGuiService: RenderGuiService, eventService: EventService, debugController: DebugController, gameObjectStore: GameObjectStore) {
        this.collisionCreator = collisionCreator;
        this.renderGuiServic = renderGuiService;
        this.eventService = eventService;
        this.debugController = debugController;
        this.gameObjectStore = gameObjectStore;

        this.eventService.guiEvents.onGameObjectSelected(gameObject => this.setGameObject(gameObject));
    }

    delete() {
        if (this.gameObject) {
            this.gameObjectStore.removeItem(this.gameObject, true);
        }
    }

    get gameObject() {
        return this._gameObject;
    }

    async setCollisionMesh(hasBoundingBox: boolean) {
        if (!this._gameObject || hasBoundingBox === !!this._gameObject.collisionMesh) { return; }

        if (!hasBoundingBox) {
            if (this._gameObject.collisionMesh) {
                this._gameObject.mainMesh.setParent(null);
                this._gameObject.collisionMesh.dispose();
                this._gameObject.collisionMesh = undefined;
                this._gameObject.config.collider = undefined;
            }
        } else {
            this._gameObject.config.collider = { dimension: "0:0:0" }
            await this.collisionCreator.processPropertyAsync(this._gameObject, this._gameObject.config.collider);
        }
        
        this.debugController.updateBoundingBoxVisibility();
        this.renderGuiServic.render();
    }

    get collisionMesh() {
        return this._gameObject ? !!this._gameObject.collisionMesh : false;
    }

    private setGameObject(gameObject: GameObject) {
        this._gameObject = gameObject;
        this.renderGuiServic.render();
    }
}
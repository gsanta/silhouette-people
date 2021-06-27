import { Vector3 } from "babylonjs/Maths/math.vector";
import { GameObjectConfig, GameObjectTag } from "../../../model/objects/game_object/GameObject";
import { GameObjectStore } from "../../../store/GameObjectStore";
import { EventService } from "../../EventService";
import { KeyboardService, KeyName } from "../../input/KeyboardService";
import { MeshFactory } from "../../object/mesh/MeshFactory";
import { RenderGuiService } from "../../RenderGuiService";

export class MeshLoaderController {

    private readonly keyboardService: KeyboardService;
    private readonly renderGuiService: RenderGuiService;
    private readonly meshFactory: MeshFactory;
    private readonly gameObjectStore: GameObjectStore;
    private readonly eventService: EventService;
    
    private _modelName: string;
    private _textureName: string;
    private _collision: boolean = true;
    private _removeRoot = false;

    isDialogOpen = true;

    constructor(keyboardService: KeyboardService, renderGuiService: RenderGuiService, meshFactory: MeshFactory, gameObjectStore: GameObjectStore, eventService: EventService) {
        this.keyboardService = keyboardService;
        this.renderGuiService = renderGuiService;
        this.meshFactory = meshFactory;
        this.gameObjectStore = gameObjectStore;
        this.eventService = eventService;
        this.onKeyDown = this.onKeyDown.bind(this);

        this.keyboardService.onKeydown(this.onKeyDown);
    }

    set removeRoot(removeRoot: boolean) {
        this._removeRoot = removeRoot;
        this.renderGuiService.render();
    }

    get removeRoot(): boolean {
        return this._removeRoot;
    }

    set modelName(name: string) {
        this._modelName = name;
        this.renderGuiService.render();
    }

    get modelName(): string {
        return this._modelName;
    }

    set textureName(name: string) {
        this._textureName = name;
        this.renderGuiService.render();
    }

    get textureName(): string {
        return this._textureName;
    }

    set collision(collision: boolean) {
        this._collision = collision;
        this.renderGuiService.render();
    }

    get collision(): boolean {
        return this._collision;
    }

    async load() {
        const gameObjectConfig: GameObjectConfig = {
            model: {
                path: this.modelName,
                removeRoot: this.removeRoot
            },
            texture: {
                path: this.textureName,

            },
            rotate: 0,
            collider: this.collision ? { dimension: '0:0:0' } : undefined,
            props: [],
            tags: [GameObjectTag._UI_CREATED]
        }
        const gameObject = await this.meshFactory.createFromConfig(gameObjectConfig);
        this.gameObjectStore.addItem(gameObject);
        this.eventService.guiEvents.emitGameObjectCreated();
    }

    private onKeyDown(keyName: KeyName) {
        if (keyName === KeyName.L) {
            this.isDialogOpen = !this.isDialogOpen;
            this.renderGuiService.render();
        }
    }
}
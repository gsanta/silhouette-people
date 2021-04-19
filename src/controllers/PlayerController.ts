import { InjectProperty } from "../di/diDecorators";
import { MeshObj, MeshObjTag, MeshObjType, Character, Bike } from "../model/general/objs/MeshObj";
import { CharacterGetOffBikeState } from "../model/character/states/CharacterGetOffBikeState";
import { CharacterGetOnBikeState } from "../model/character/states/CharacterGetOnBikeState";
import { KeyboardService } from "../services/input/KeyboardService";
import { MouseButtonType, PointerData } from "../services/input/PointerService";
import { lookup } from "../services/Lookup";
import { RenderGuiService } from "../services/RenderGuiService";
import { TileMarker } from "../services/tile/TileMarker";
import { MeshStore } from "../stores/MeshStore";
import { AbstractController, ControllerType } from "./IController";
import { Vector2 } from "babylonjs";

export class PlayerController extends AbstractController {
    type = ControllerType.Player;

    @InjectProperty("KeyboardService")
    private keyboardService: KeyboardService;
    
    @InjectProperty("MeshStore")
    private meshStore: MeshStore;
    
    @InjectProperty("RenderGuiService")
    private renderGuiService: RenderGuiService;
    
    private tileMarker: TileMarker;

    readonly speedConst = 0.04;
    readonly rotationConst = Math.PI / 30;

    constructor() {
        super();
        this.tileMarker = new TileMarker();
        this.keyboardService = lookup.keyboard;
        this.meshStore = lookup.meshStore;
        this.renderGuiService = lookup.renderGui;
    }


    keyboard(e: KeyboardEvent) {
        const player = this.meshStore.getActivePlayer();

        if (this.keyboardService.activeKeys.has('w')) {
            player.walker.setSpeed(this.speedConst);
        } else if (this.keyboardService.activeKeys.has('s')) {
            player.walker.setSpeed(-this.speedConst);
        } else {
            player.walker.setSpeed(0);
        }

        if (this.keyboardService.activeKeys.has('a')) {
            player.walker.setRotation(-this.rotationConst);
        } else if (this.keyboardService.activeKeys.has('d')) {
            player.walker.setRotation(this.rotationConst);
        } else {
            player.walker.setRotation(0);
        }

        switch(e.key) {
            case 'e':
                this.enterAction(player);
            break;
            case 'q':
                this.exitAction();
            break;
        }
    }

    beforeRender() {
        const player = this.meshStore.getActivePlayer();
        player.state.beforeRender();
    }

    private enterAction(player: Character) {
        const nearestActionableObj = this.getNearestActionableObj(player);

        if (nearestActionableObj) {
            this.activateActionable(player, nearestActionableObj);
            this.renderGuiService.render(true);
        }
    }

    private exitAction() {
        const player = this.meshStore.getActivePlayer();
        player.state = new CharacterGetOffBikeState(player);
        this.renderGuiService.render(true);
    }

    private activateActionable(player: Character, actionableObj: MeshObj) {
        switch(actionableObj.type) {
            case MeshObjType.Bicycle1:
                if (!player.getParent()) {
                    player.state = new CharacterGetOnBikeState(player, actionableObj as Bike);
                }
            break;
        }
    }

    private getNearestActionableObj(player: MeshObj): MeshObj  {
        const bicycles = this.meshStore.getBikes()
        const bikeAndDist = bicycles.map(bicycle => ({ bike: bicycle, dist: this.distance(bicycle, player)}));
        bikeAndDist.sort((d1, d2) => d1.dist - d2.dist);

        return bikeAndDist[0].dist < 1.5 ? bikeAndDist[0].bike : undefined;
    }

    private distance(meshObj1: MeshObj, meshObj2: MeshObj) {
        return Vector2.Distance(meshObj1.getPosition2D(), meshObj2.getPosition2D());
    }
}
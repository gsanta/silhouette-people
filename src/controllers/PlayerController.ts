import { Vector2 } from "babylonjs";
import { InjectProperty } from "../di/diDecorators";
import { CharacterGetOffBikeState } from "../model/character/states/CharacterGetOffBikeState";
import { CharacterGetOnBikeState } from "../model/character/states/CharacterGetOnBikeState";
import { BikeObj, CharacterObj, HumanoidObj } from "../model/general/objs/CharacterObj";
import { MeshObj, MeshObjType } from "../model/general/objs/MeshObj";
import { KeyboardService } from "../services/input/KeyboardService";
import { lookup } from "../services/Lookup";
import { RenderGuiService } from "../services/RenderGuiService";
import { TileMarker } from "../services/tile/TileMarker";
import { WorldProvider } from "../services/WorldProvider";
import { MeshStore } from "../stores/MeshStore";
import { AbstractController, ControllerType } from "./IController";

export class PlayerController extends AbstractController {
    type = ControllerType.Player;

    @InjectProperty("KeyboardService")
    private keyboardService: KeyboardService;
    
    @InjectProperty("MeshStore")
    private meshStore: MeshStore;
    
    @InjectProperty("RenderGuiService")
    private renderGuiService: RenderGuiService;

    @InjectProperty("WorldProvider")
    private worldProvider: WorldProvider;
    
    private tileMarker: TileMarker;

    readonly speedConst = 0.04;
    readonly rotationConst = Math.PI / 30;

    constructor() {
        super();
        this.tileMarker = new TileMarker();
        this.keyboardService = lookup.keyboard;
        this.meshStore = lookup.meshStore;
        this.renderGuiService = lookup.renderGui;
        this.worldProvider = lookup.worldProvider;
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
        const deltaTime = this.worldProvider.world.engine.getDeltaTime();
        player.walker.walk(deltaTime);
        player.animationState.update();
    }

    private enterAction(player: HumanoidObj) {
        const nearestActionableObj = this.getNearestActionableObj(player);

        if (nearestActionableObj) {
            this.activateActionable(player, nearestActionableObj);
            this.renderGuiService.render(true);
        }
    }

    private exitAction() {
        const player = this.meshStore.getActivePlayer();
        player.animationState = new CharacterGetOffBikeState(player);
        this.renderGuiService.render(true);
    }

    private activateActionable(player: HumanoidObj, actionableObj: MeshObj) {
        switch(actionableObj.type) {
            case MeshObjType.Bicycle1:
                if (!player.getParent()) {
                    player.animationState = new CharacterGetOnBikeState(player, actionableObj as BikeObj);
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
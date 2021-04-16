import { InjectProperty } from "../di/diDecorators";
import { MeshObj, MeshObjTag, MeshObjType, Character, Bike } from "../model/objs/MeshObj";
import { PlayerGetOffBikeState } from "../model/states/PlayerGetOffBikeState";
import { PlayerGetOnBikeState } from "../model/states/PlayerGetOnBikeState";
import { KeyboardService } from "../services/input/KeyboardService";
import { MouseButtonType, PointerData } from "../services/input/PointerService";
import { lookup } from "../services/Lookup";
import { RenderGuiService } from "../services/RenderGuiService";
import { TileMarker } from "../services/tile/TileMarker";
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
    
    private tileMarker: TileMarker;

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
            player.state.setSpeed(player.state.speedConst);
        } else if (this.keyboardService.activeKeys.has('s')) {
            player.state.setSpeed(-player.state.speedConst);
        } else {
            player.state.setSpeed(0);
        }

        if (this.keyboardService.activeKeys.has('a')) {
            player.state.setRotation(-player.state.rotationConst);
        } else if (this.keyboardService.activeKeys.has('d')) {
            player.state.setRotation(player.state.rotationConst);
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

    pointerDown(pointer: PointerData) {
        switch(pointer.buttonType) {
            case MouseButtonType.LEFT:
                this.tileMarker.markActive(pointer.down2D);
            break;
            case MouseButtonType.RIGHT:
                this.tileMarker.unmarkActive(pointer.down2D);
            break;
        }
    }

    pointerMove(pointer: PointerData) {
        this.tileMarker.unmarkHoverAll();
        this.tileMarker.markHover(pointer.curr2D);
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
        player.state = new PlayerGetOffBikeState(player);
        this.renderGuiService.render(true);
    }

    private activateActionable(player: Character, actionableObj: MeshObj) {
        switch(actionableObj.type) {
            case MeshObjType.Bicycle1:
                if (!player.player.hasBikeVechicle()) {
                    player.state = new PlayerGetOnBikeState(player, actionableObj as Bike);
                }
            break;
        }
    }

    private getNearestActionableObj(player: MeshObj): MeshObj  {
        const bicycles = this.meshStore.getObjsByTag(MeshObjTag.Bicycle);
        const bikeAndDist = bicycles.map(bicycle => ({ bike: bicycle, dist: bicycle.mesh.distance(player)}));
        bikeAndDist.sort((d1, d2) => d1.dist - d2.dist);

        return bikeAndDist[0].dist < 1.5 ? bikeAndDist[0].bike : undefined;
    }
}
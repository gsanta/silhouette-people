import { SpotLight } from "babylonjs";
import { InjectProperty } from "../di/diDecorators";
import { MeshObj, MeshObjType, MeshObjTag } from "../model/objs/MeshObj";
import { PlayerGetOffBikeState } from "../model/states/PlayerGetOffBikeState";
import { PlayerGetOnBikeState } from "../model/states/PlayerGetOnBikeState";
import { MouseButtonType, PointerData } from "../services/input/PointerService";
import { lookup, Lookup } from "../services/Lookup";
import { RenderGuiService } from "../services/RenderGuiService";
import { TileMarker } from "../services/tile/TileMarker";
import { MeshStore } from "../stores/MeshStore";
import { AbstractController, ControllerType } from "./IController";

export class PlayerController extends AbstractController {
    type = ControllerType.Player;

    private tileMarker: TileMarker;
    
    @InjectProperty("MeshStore")
    private meshStore: MeshStore;

    @InjectProperty("RenderGuiService")
    private renderGuiService: RenderGuiService;

    constructor() {
        super();
        this.tileMarker = new TileMarker();
        this.meshStore = lookup.meshStore;
        this.renderGuiService = lookup.renderGui;
    }


    keyboard(e: KeyboardEvent) {
        const player = this.meshStore.getActivePlayer();

        switch(e.key) {
            case 'e':
                const nearestActionableObj = this.getNearestActionableObj(player);

                if (nearestActionableObj) {
                    this.activateActionable(player, nearestActionableObj);
                    this.renderGuiService.render(true);
                }
            break;
            case 'q':
                this.exitAction();
                this.renderGuiService.render(true);
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

    private exitAction() {
        const player = this.meshStore.getActivePlayer();
        player.state.setState(new PlayerGetOffBikeState(player));
    }

    private activateActionable(player: MeshObj, actionableObj: MeshObj) {
        switch(actionableObj.type) {
            case MeshObjType.Bicycle1:
                if (!player.player.hasBikeVechicle()) {
                    player.state.setState(new PlayerGetOnBikeState(player, actionableObj));
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
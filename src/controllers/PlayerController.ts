import { InjectProperty } from "../di/diDecorators";
import { MeshObj, MeshObjTag, MeshObjType } from "../model/objs/MeshObj";
import { PlayerGetOffBikeState } from "../model/states/PlayerGetOffBikeState";
import { PlayerGetOnBikeState } from "../model/states/PlayerGetOnBikeState";
import { MouseButtonType, PointerData } from "../services/input/PointerService";
import { lookup } from "../services/Lookup";
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
        //         const velocity = new Vector3(0, 0, 0);
//         const rotation = new Vector3(0, 0, 0);

//         if (this.keyboardService.activeKeys.has('w')) {
//             velocity.z = this.speed; 
//         } else if (this.keyboardService.activeKeys.has('s')) {
//             velocity.z = -this.speed;
//         } else {
//             velocity.z = 0;
//         }

//         if (this.keyboardService.activeKeys.has('a')) {
//             rotation.y -= this.rotationSpeed;
//         } else if (this.keyboardService.activeKeys.has('d')) {
//             rotation.y += this.rotationSpeed;
//         }

//         this.gameObject.velocity = velocity;
//         this.gameObject.rotation = rotation;

//         if (
//             !this.keyboardService.checker.isMoveForward() &&
//             !this.keyboardService.checker.isMoveBackward() &&
//             !this.keyboardService.checker.isTurnLeft() &&
//             !this.keyboardService.checker.isTurnRight()
//         ) {
//             this.gameObject.state.setState(new PlayerIdleState(this.gameObject));
//         }
        const player = this.meshStore.getActivePlayer();

        switch(e.key) {
            case 'e':

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

    private enterAction() {
        const nearestActionableObj = this.getNearestActionableObj(player);

        if (nearestActionableObj) {
            this.activateActionable(player, nearestActionableObj);
            this.renderGuiService.render(true);
        }
    }

    private exitAction() {
        const player = this.meshStore.getActivePlayer();
        player.state.setState(new PlayerGetOffBikeState(player));
        this.renderGuiService.render(true);
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
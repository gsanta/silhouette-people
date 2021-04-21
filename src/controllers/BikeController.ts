import { InjectProperty } from "../di/diDecorators";
import { BikeObj } from "../model/general/objs/CharacterObj";
import { KeyboardService } from "../services/input/KeyboardService";
import { lookup } from "../services/Lookup";
import { MeshStore } from "../stores/MeshStore";
import { AbstractController } from "./IController";

export class BikeController extends AbstractController {
    type = null;

    @InjectProperty("MeshStore")
    private meshStore: MeshStore;

    @InjectProperty("KeyboardService")
    private keyboardService: KeyboardService;

    constructor() {
        super();

        this.meshStore = lookup.meshStore;
        this.keyboardService = lookup.keyboard;
    }

    keyboard(e: KeyboardEvent, isKeyDown: boolean) {
        const player = this.meshStore.getActivePlayer();

        if (!player.getParent()) { return; }

        const bike = <BikeObj> player.getParent();
        
        if (isKeyDown) {
            switch(e.key) {
                case '1':
                    bike.walker.setGear(0);
                break;
                case '2':
                    bike.walker.setGear(1);
                break;
                case '3':
                    bike.walker.setGear(2);
                break;
                case 'w':
                    bike.walker.setPedalling(true);
                    bike.walker.setPedalDirection('forward');
                break;
                case 's':
                    bike.walker.setBraking(true);
                break;
                case 'r':
                    bike.walker.setPedalling(true);
                    bike.walker.setPedalDirection('backward');
                break;
            }
        } else {
            switch(e.key) {
                case 'w':
                    bike.walker.setPedalling(false);
                break;
                case 's':
                    bike.walker.setBraking(false);
                break;
                case 'r':
                    bike.walker.setPedalling(false);
                break;
            }
        }

        if (this.keyboardService.activeKeys.has('a')) {
            bike.walker.setRotation(-bike.walker.rotationConst);
        } else if (this.keyboardService.activeKeys.has('d')) {
            bike.walker.setRotation(bike.walker.rotationConst);
        } else {
            bike.walker.setRotation(0);
        }
    }

    beforeRender() {
        const bike = this.meshStore.getBikes()[0];

        bike.animationState.update();
    }
}
import { KeyboardService } from "../../../service/base/keyboard/KeyboardService";
import { BikeObj } from "../objs/CharacterObj";
import { MeshInputManager } from "./MeshInputManager";

export class BikeInputManager extends MeshInputManager {
    private keyboardService: KeyboardService;
    private bike: BikeObj;

    constructor(bike: BikeObj, keyboardService: KeyboardService) {
        super();
        this.keyboardService = keyboardService;
        this.bike = bike;
    }

    keyboard(e: KeyboardEvent, isKeyDown: boolean) {
        if (!this.isSpeedDisabled) {
            this.handleSpeed(e, isKeyDown);
        }

        if (!this.isDirectionDisabled) {
            this.handleDirection();
        }
    }

    private handleDirection() {
        const bike = this.bike;

        if (this.keyboardService.activeKeys.has('a')) {
            bike.walker.setRotation(-bike.walker.rotationConst);
        } else if (this.keyboardService.activeKeys.has('d')) {
            bike.walker.setRotation(bike.walker.rotationConst);
        } else {
            bike.walker.setRotation(0);
        }
    }

    private handleSpeed(e: KeyboardEvent, isKeyDown: boolean) {
        const bike = this.bike;

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
    }
}
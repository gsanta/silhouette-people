import { KeyboardService } from "../../../service/base/keyboard/KeyboardService";
import { MeshInputManager } from "../../MeshInputManager";
import { BikeWalker } from "./states/BikeWalker";

export class BikeInputManager extends MeshInputManager {
    private keyboardService: KeyboardService;
    private bikeWalker: BikeWalker;

    constructor(bikeWalker: BikeWalker, keyboardService: KeyboardService) {
        super();
        this.bikeWalker = bikeWalker;
        this.keyboardService = keyboardService;
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
        const walker = this.bikeWalker;

        if (this.keyboardService.activeKeys.has('a')) {
            walker.setRotation(-walker.rotationConst);
        } else if (this.keyboardService.activeKeys.has('d')) {
            walker.setRotation(walker.rotationConst);
        } else {
            walker.setRotation(0);
        }
    }

    private handleSpeed(e: KeyboardEvent, isKeyDown: boolean) {
        const walker = this.bikeWalker;

        if (isKeyDown) {
            switch(e.key) {
                case '1':
                    walker.setGear(0);
                break;
                case '2':
                    walker.setGear(1);
                break;
                case '3':
                    walker.setGear(2);
                break;
                case 'w':
                    walker.setPedalling(true);
                    walker.setPedalDirection('forward');
                break;
                case 's':
                    walker.setBraking(true);
                break;
                case 'r':
                    walker.setPedalling(true);
                    walker.setPedalDirection('backward');
                break;
            }
        } else {
            switch(e.key) {
                case 'w':
                    walker.setPedalling(false);
                break;
                case 's':
                    walker.setBraking(false);
                break;
                case 'r':
                    walker.setPedalling(false);
                break;
            }
        }
    }
}
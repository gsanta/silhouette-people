import { KeyboardService } from "../../../../service/base/keyboard/KeyboardService";
import { MeshItem } from "../../mesh/MeshItem";
import { InputController } from "./InputController";

export class HumanInputManager extends InputController {
    readonly speedConst = 0.04;
    readonly rotationConst = Math.PI / 30;
    
    private keyboardService: KeyboardService;
    private character: MeshItem;

    constructor(character: MeshItem, keyboardService: KeyboardService) {
        super();
        this.keyboardService = keyboardService;
        this.character = character;
    }
    
    keyboard() {
        if (!this.isSpeedDisabled) {
            this.handleSpeed();
        }

        if (!this.isDirectionDisabled) {
            this.handleDirection();
        }

        // switch(e.key) {
        //     case 'e':
        //         this.enterAction(player);
        //     break;
        //     case 'q':
        //         this.exitAction();
        //     break;
        // }
    }

    private handleDirection() {

    }

    private handleSpeed() {
        if (this.keyboardService.keys.has('w')) {
            this.character.characterController.setSpeed(this.speedConst);
        } else if (this.keyboardService.keys.has('s')) {
            this.character.characterController.setSpeed(-this.speedConst);
        } else {
            this.character.characterController.setSpeed(0);
        }
    }
}
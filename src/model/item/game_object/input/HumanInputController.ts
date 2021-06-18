import { KeyboardService } from "../../../../service/base/keyboard/KeyboardService";
import { GameObject } from "../../../objects/game_object/GameObject";
import { InputController } from "../../../objects/game_object/controller_input/InputController";

export class HumanInputController extends InputController {
    readonly speedConst = 0.04;
    readonly rotationConst = Math.PI / 30;
    
    private keyboardService: KeyboardService;
    private character: GameObject;

    constructor(character: GameObject, keyboardService: KeyboardService) {
        super(keyboardService);
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
            this.character.motionController.setSpeed(this.speedConst);
        } else if (this.keyboardService.keys.has('s')) {
            this.character.motionController.setSpeed(-this.speedConst);
        } else {
            this.character.motionController.setSpeed(0);
        }
    }
}
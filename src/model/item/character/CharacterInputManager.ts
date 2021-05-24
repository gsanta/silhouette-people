import { KeyboardService } from "../../../service/base/keyboard/KeyboardService";
import { CharacterItem } from "./CharacterItem";
import { MeshInputManager } from "../../MeshInputManager";

export class CharacterInputManager extends MeshInputManager {
    readonly speedConst = 0.04;
    readonly rotationConst = Math.PI / 30;
    
    private keyboardService: KeyboardService;
    private character: CharacterItem;

    constructor(character: CharacterItem, keyboardService: KeyboardService) {
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
            this.character.mover.setSpeed(this.speedConst);
        } else if (this.keyboardService.keys.has('s')) {
            this.character.mover.setSpeed(-this.speedConst);
        } else {
            this.character.mover.setSpeed(0);
        }
    }
}
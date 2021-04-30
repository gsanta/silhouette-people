import { KeyboardService } from "../../../service/base/keyboard/KeyboardService";
import { CharacterObj } from "./CharacterObj";
import { MeshInputManager } from "../../MeshInputManager";

export class CharacterInputManager extends MeshInputManager {
    readonly speedConst = 0.04;
    readonly rotationConst = Math.PI / 30;
    
    private keyboardService: KeyboardService;
    private character: CharacterObj;

    constructor(character: CharacterObj, keyboardService: KeyboardService) {
        super();
        this.keyboardService = keyboardService;
        this.character = character;
    }
    
    keyboard(e: KeyboardEvent) {
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
        if (this.keyboardService.activeKeys.has('a')) {
            this.character.walker.setRotation(-this.rotationConst);
        } else if (this.keyboardService.activeKeys.has('d')) {
            this.character.walker.setRotation(this.rotationConst);
        } else {
            this.character.walker.setRotation(0);
        }
    }

    private handleSpeed() {
        if (this.keyboardService.activeKeys.has('w')) {
            this.character.walker.setSpeed(this.speedConst);
        } else if (this.keyboardService.activeKeys.has('s')) {
            this.character.walker.setSpeed(-this.speedConst);
        } else {
            this.character.walker.setSpeed(0);
        }
    }
}
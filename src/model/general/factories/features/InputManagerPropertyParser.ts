

import { KeyboardService } from "../../../../services/input/KeyboardService";
import { BikeInputManager } from "../../input/BikeInputManager";
import { CharacterInputManager } from "../../input/CharacterInputManager";
import { BikeObj, CharacterObj } from "../../objs/CharacterObj";
import { AbstractPropertyParser } from "../AbstractPropertyParser";

enum InputManagerType {
    CharacterInputManager = 'CharacterInputManager',
    BikeInputManager = 'BikeInputManager'
}

export class InputManagerPropertyParser extends AbstractPropertyParser {
    private keyboardService: KeyboardService;

    constructor(keyboardService: KeyboardService) {
        super();
        this.keyboardService = keyboardService;
    }

    feature = 'InputManager';

    isAsync(): boolean {
        return false;
    }

    processFeature(character: CharacterObj, attrs: string[]): void {
        const input = <InputManagerType> attrs[0];

        switch(input) {
            case InputManagerType.CharacterInputManager:
                character.inputManager = new CharacterInputManager(character, this.keyboardService);
            break;
            case InputManagerType.BikeInputManager:
                character.inputManager = new BikeInputManager(<BikeObj> character, this.keyboardService);
            break;
        }
    }
}
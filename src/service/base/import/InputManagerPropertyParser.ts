

import { BikeInputManager } from "../../../model/object/bike/BikeInputManager";
import { BikeWalker } from "../../../model/object/bike/states/BikeWalker";
import { CharacterInputManager } from "../../../model/object/character/CharacterInputManager";
import { CharacterObj } from "../../../model/object/character/CharacterObj";
import { KeyboardService } from "../keyboard/KeyboardService";
import { AbstractPropertyParser } from "./AbstractPropertyParser";

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
                character.inputManager = new BikeInputManager(<BikeWalker> character.walker, this.keyboardService);
            break;
        }
    }
}
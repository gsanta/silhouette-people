

import { BikeInputManager } from "../../../../model/item/bike/BikeInputManager";
import { BikeWalker } from "../../../../model/item/bike/states/BikeWalker";
import { CharacterInputManager } from "../../../../model/item/character/CharacterInputManager";
import { CharacterItem } from "../../../../model/item/character/CharacterItem";
import { KeyboardService } from "../../keyboard/KeyboardService";
import { AbstractPropertyParser } from "../AbstractPropertyParser";

enum InputManagerType {
    CharacterInputManager = 'CharacterInputManager',
    BikeInputManager = 'BikeInputManager'
}

export class InputManagerPropertyParser extends AbstractPropertyParser<string> {
    propName = 'inputManager';

    private keyboardService: KeyboardService;

    constructor(keyboardService: KeyboardService) {
        super();
        this.keyboardService = keyboardService;
    }

    isAsync(): boolean {
        return false;
    }

    processProperty(character: CharacterItem, inputManager: string): void {
        switch(inputManager) {
            case InputManagerType.CharacterInputManager:
                character.inputManager = new CharacterInputManager(character, this.keyboardService);
            break;
            case InputManagerType.BikeInputManager:
                character.inputManager = new BikeInputManager(<BikeWalker> character.walker, character, this.keyboardService);
            break;
        }
    }
}
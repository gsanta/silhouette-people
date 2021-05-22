

import { BikeInputManager } from "../../../../model/item/bike/BikeInputManager";
import { BikeMover } from "../../../../model/item/bike/states/BikeMover";
import { CharacterInputManager } from "../../../../model/item/character/CharacterInputManager";
import { CharacterItem } from "../../../../model/item/character/CharacterItem";
import { GraphService } from "../../../graph/GraphService";
import { KeyboardService } from "../../keyboard/KeyboardService";
import { AbstractPropertyParser } from "../AbstractPropertyParser";

enum InputManagerType {
    CharacterInputManager = 'CharacterInputManager',
    BikeInputManager = 'BikeInputManager'
}

export class InputManagerPropertyParser extends AbstractPropertyParser<string> {
    propName = 'inputManager';

    private readonly keyboardService: KeyboardService;
    private readonly graphService: GraphService;

    constructor(keyboardService: KeyboardService, graphService: GraphService) {
        super();
        this.keyboardService = keyboardService;
        this.graphService = graphService;
    }

    isAsync(): boolean {
        return false;
    }

    processProperty(character: CharacterItem, inputManager: string): void {
        switch(inputManager) {
            case InputManagerType.CharacterInputManager:
                character.inputManager = new CharacterInputManager(character, this.keyboardService);
            break;
            // case InputManagerType.BikeInputManager:
            //     character.inputManager = new BikeInputManager(<BikeWalker> character.walker, character, this.keyboardService, this.graphService);
            // break;
        }
    }
}
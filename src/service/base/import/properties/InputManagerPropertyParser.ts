

import { BikeInputController } from "../../../../model/item/game_object/input/BikeInputController";
import { BikeController } from "../../../../model/item/bike/states/BikeController";
import { HumanInputManager } from "../../../../model/item/game_object/input/HumanInputManager";
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
                character.inputController = new HumanInputManager(character, this.keyboardService);
            break;
            // case InputManagerType.BikeInputManager:
            //     character.inputManager = new BikeInputManager(<BikeWalker> character.walker, character, this.keyboardService, this.graphService);
            // break;
        }
    }
}
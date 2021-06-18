import { GameObject } from "../../../model/objects/game_object/GameObject";
import { GraphService } from "../../graph/GraphService";
import { KeyboardService } from "../../input/KeyboardService";
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

    processProperty(character: GameObject, inputManager: string): void {
        switch(inputManager) {
            case InputManagerType.CharacterInputManager:
                // character.inputController = new HumanInputController(character, this.keyboardService);
            break;
            // case InputManagerType.BikeInputManager:
            //     character.inputManager = new BikeInputManager(<BikeWalker> character.walker, character, this.keyboardService, this.graphService);
            // break;
        }
    }
}
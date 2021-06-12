import { BikeController } from "../../../../model/item/bike/states/BikeController";
import { HumanController } from "../../../../model/item/character/states/HumanController";
import { BikeItem, CharacterItem } from "../../../../model/item/character/CharacterItem";
import { CharacterController } from "../../../../model/item/mesh/CharacterController";
import { AbstractPropertyParser } from "../AbstractPropertyParser";

enum WalkerName {
    BikeWalker = 'BikeWalker',
    CharacterWalker = 'CharacterWalker'
}

export class WalkerPropertyParser extends AbstractPropertyParser<string> {
    propName = 'walker';

    isAsync(): boolean {
        return false;
    }

    processProperty(mesh: CharacterItem, walkerName: string) {
        mesh.characterController = this.createWalker(mesh, walkerName as WalkerName);
    }

    private createWalker(meshObj: CharacterItem, stateName: WalkerName): CharacterController {
        switch(stateName) {
            case WalkerName.BikeWalker:
                return new BikeController(meshObj as BikeItem);
            case WalkerName.CharacterWalker:
                return new HumanController(meshObj);
        }
    }
}
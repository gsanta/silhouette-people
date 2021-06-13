import { BikeController } from "../../../../model/item/bike/states/BikeController";
import { HumanController } from "../../../../model/item/character/states/HumanController";
import { CharacterController } from "../../../../model/item/mesh/CharacterController";
import { MeshItem } from "../../../../model/item/mesh/MeshItem";
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

    processProperty(mesh: MeshItem, walkerName: string) {
        mesh.characterController = this.createWalker(mesh, walkerName as WalkerName);
    }

    private createWalker(meshObj: MeshItem, stateName: WalkerName): CharacterController {
        switch(stateName) {
            case WalkerName.BikeWalker:
                return new BikeController(meshObj as MeshItem);
            case WalkerName.CharacterWalker:
                return new HumanController(meshObj);
        }
    }
}
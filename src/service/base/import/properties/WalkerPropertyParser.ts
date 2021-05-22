import { BikeMover } from "../../../../model/item/bike/states/BikeMover";
import { CharacterMover } from "../../../../model/item/character/states/CharacterMover";
import { BikeItem, CharacterItem } from "../../../../model/item/character/CharacterItem";
import { MeshMover } from "../../../../model/item/mesh/MeshMover";
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
        mesh.mover = this.createWalker(mesh, walkerName as WalkerName);
    }

    private createWalker(meshObj: CharacterItem, stateName: WalkerName): MeshMover {
        switch(stateName) {
            case WalkerName.BikeWalker:
                return new BikeMover(meshObj as BikeItem);
            case WalkerName.CharacterWalker:
                return new CharacterMover(meshObj);
        }
    }
}
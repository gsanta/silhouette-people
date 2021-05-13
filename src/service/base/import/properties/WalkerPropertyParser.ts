import { BikeWalker } from "../../../../model/item/bike/states/BikeWalker";
import { CharacterWalker } from "../../../../model/item/character/states/CharacterWalker";
import { BikeItem, CharacterItem } from "../../../../model/item/character/CharacterItem";
import { MeshWalker } from "../../../../model/item/mesh/MeshWalker";
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
        mesh.walker = this.createWalker(mesh, walkerName as WalkerName);
    }

    private createWalker(meshObj: CharacterItem, stateName: WalkerName): MeshWalker {
        switch(stateName) {
            case WalkerName.BikeWalker:
                return new BikeWalker(meshObj as BikeItem);
            case WalkerName.CharacterWalker:
                return new CharacterWalker(meshObj);
        }
    }
}
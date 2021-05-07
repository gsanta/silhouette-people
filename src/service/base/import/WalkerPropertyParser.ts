import { BikeWalker } from "../../../model/object/bike/states/BikeWalker";
import { CharacterWalker } from "../../../model/object/character/states/CharacterWalker";
import { BikeObj, CharacterObj } from "../../../model/object/character/CharacterObj";
import { MeshWalker } from "../../../model/object/mesh/MeshWalker";
import { AbstractPropertyParser } from "./AbstractPropertyParser";

enum WalkerName {
    BikeWalker = 'BikeWalker',
    CharacterWalker = 'CharacterWalker'
}

export class WalkerPropertyParser extends AbstractPropertyParser<string> {
    propName = 'walker';

    isAsync(): boolean {
        return false;
    }

    processProperty(mesh: CharacterObj, walkerName: string) {
        mesh.walker = this.createWalker(mesh, walkerName as WalkerName);
    }

    private createWalker(meshObj: CharacterObj, stateName: WalkerName): MeshWalker {
        switch(stateName) {
            case WalkerName.BikeWalker:
                return new BikeWalker(meshObj as BikeObj);
            case WalkerName.CharacterWalker:
                return new CharacterWalker(meshObj);
        }
    }
}
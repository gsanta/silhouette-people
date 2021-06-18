import { BikeController } from "../../../../model/objects/game_object/types/bike/BikeController";
import { HumanController } from "../../../../model/item/character/states/HumanController";
import { MotionController } from "../../../../model/objects/game_object/controller_motion/MotionController";
import { GameObject } from "../../../../model/objects/game_object/GameObject";
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

    processProperty(mesh: GameObject, walkerName: string) {
        mesh.motionController = this.createWalker(mesh, walkerName as WalkerName);
    }

    private createWalker(meshObj: GameObject, stateName: WalkerName): MotionController {
        switch(stateName) {
            case WalkerName.BikeWalker:
                return new BikeController(meshObj as GameObject);
            case WalkerName.CharacterWalker:
                return new HumanController(meshObj);
        }
    }
}
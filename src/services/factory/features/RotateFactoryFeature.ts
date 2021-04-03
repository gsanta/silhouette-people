import { Axis, Space, Tools } from "babylonjs";
import { GameObj } from "../../../model/objs/GameObj";
import { AbstractFactoryFeature } from "./AbstractFactoryFeacture";

export class RotateFactoryFeature extends AbstractFactoryFeature {
    feature = 'Rotate';

    isAsync(): boolean {
        return false;
    }

    processFeature(gameObj: GameObj, attrs: string[]) {
        const [rotation] = attrs;
        const rotationRad = Tools.ToRadians(parseInt(rotation, 10));
        
        gameObj.getMesh().rotate(Axis.Y, rotationRad, Space.WORLD);
    }
}
import { Axis, Space, Tools } from "babylonjs";
import { GameObject } from "../../../../model/objects/game_object/GameObject";
import { AbstractPropertyParser } from "../AbstractPropertyParser";

export class RotatePropertyParser extends AbstractPropertyParser<number> {
    propName = 'rotate';

    isAsync(): boolean {
        return false;
    }

    processProperty(gameObj: GameObject, rotate: number) {
        const rotationRad = Tools.ToRadians(rotate);
        
        gameObj.mesh.rotate(Axis.Y, rotationRad, Space.WORLD);
    }
}
import { Axis, Space, Tools } from "babylonjs";
import { MeshObj } from "../../../model/object/mesh/MeshObj";
import { AbstractPropertyParser } from "./AbstractPropertyParser";

export class RotatePropertyParser extends AbstractPropertyParser<number> {
    propName = 'rotate';

    isAsync(): boolean {
        return false;
    }

    processProperty(gameObj: MeshObj, rotate: number) {
        const rotationRad = Tools.ToRadians(rotate);
        
        gameObj.instance.getMesh().rotate(Axis.Y, rotationRad, Space.WORLD);
    }
}
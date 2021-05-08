import { Axis, Space, Tools } from "babylonjs";
import { MeshItem } from "../../../model/item/mesh/MeshItem";
import { AbstractPropertyParser } from "./AbstractPropertyParser";

export class RotatePropertyParser extends AbstractPropertyParser<number> {
    propName = 'rotate';

    isAsync(): boolean {
        return false;
    }

    processProperty(gameObj: MeshItem, rotate: number) {
        const rotationRad = Tools.ToRadians(rotate);
        
        gameObj.instance.getMesh().rotate(Axis.Y, rotationRad, Space.WORLD);
    }
}
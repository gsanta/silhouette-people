import { Axis, Space, Tools } from "babylonjs";
import { MeshObj } from "../../../model/object/mesh/MeshObj";
import { AbstractPropertyParser } from "./AbstractPropertyParser";

export class RotatePropertyParser extends AbstractPropertyParser {
    feature = 'Rotate';

    isAsync(): boolean {
        return false;
    }

    processFeature(gameObj: MeshObj, attrs: string[]) {
        const [rotation] = attrs;
        const rotationRad = Tools.ToRadians(parseInt(rotation, 10));
        
        gameObj.instance.getMesh().rotate(Axis.Y, rotationRad, Space.WORLD);
    }
}
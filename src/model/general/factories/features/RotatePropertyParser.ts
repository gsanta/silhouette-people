import { Axis, Space, Tools } from "babylonjs";
import { MeshObj } from "../../objs/MeshObj";
import { AbstractPropertyParser } from "../AbstractPropertyParser";

export class RotatePropertyParser extends AbstractPropertyParser {
    feature = 'Rotate';

    isAsync(): boolean {
        return false;
    }

    processFeature(gameObj: MeshObj, attrs: string[]) {
        const [rotation] = attrs;
        const rotationRad = Tools.ToRadians(parseInt(rotation, 10));
        
        gameObj.getMesh().rotate(Axis.Y, rotationRad, Space.WORLD);
    }
}
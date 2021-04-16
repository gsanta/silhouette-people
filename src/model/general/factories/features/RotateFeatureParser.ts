import { Axis, Space, Tools } from "babylonjs";
import { MeshObj } from "../../objs/MeshObj";
import { AbstractFeatureParser } from "../AbstractFeactureParser";

export class RotateFeatureParser extends AbstractFeatureParser {
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
import { Axis, Space } from "babylonjs";
import { MeshObj } from "../../objs/MeshObj";
import { AbstractFeatureParser, parseStrVector } from "../AbstractFeactureParser";

export class PositionFeatureParser extends AbstractFeatureParser {
    feature = 'Position';

    isAsync(): boolean {
        return false;
    }

    processFeature(gameObj: MeshObj, attrs: string[]) {
        const [posStr] = attrs;
        const pos = parseStrVector(posStr.trim());

        gameObj.mainMesh.translate(Axis.X, pos.x, Space.WORLD);
        gameObj.mainMesh.translate(Axis.Z, pos.z, Space.WORLD);
    }
}
import { Axis, Space } from "babylonjs";
import { MeshObj } from "../../objs/MeshObj";
import { AbstractPropertyParser, parseStrVector } from "../AbstractPropertyParser";

export class PositionPropertyParser extends AbstractPropertyParser {
    feature = 'Position';

    isAsync(): boolean {
        return false;
    }

    processFeature(gameObj: MeshObj, attrs: string[]) {
        const [posStr] = attrs;
        const pos = parseStrVector(posStr.trim());

        gameObj.instance.getAllMeshes()[0].translate(Axis.X, pos.x, Space.WORLD);
        gameObj.instance.getAllMeshes()[0].translate(Axis.Z, pos.z, Space.WORLD);
    }
}
import { Axis, Space } from "babylonjs";
import { MeshObj } from "../../../model/object/mesh/MeshObj";
import { AbstractPropertyParser, parseStrVector } from "./AbstractPropertyParser";

export class PositionPropertyParser extends AbstractPropertyParser<string> {
    propName = 'position';

    isAsync(): boolean {
        return false;
    }

    processProperty(gameObj: MeshObj, position: string) {
        const pos = parseStrVector(position.trim());

        gameObj.instance.getAllMeshes()[0].translate(Axis.X, pos.x, Space.WORLD);
        gameObj.instance.getAllMeshes()[0].translate(Axis.Z, pos.z, Space.WORLD);
    }
}
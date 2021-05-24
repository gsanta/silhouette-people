import { Axis, Space } from "babylonjs";
import { MeshItem } from "../../../../model/item/mesh/MeshItem";
import { AbstractPropertyParser, parseStrVector } from "../AbstractPropertyParser";

export class PositionPropertyParser extends AbstractPropertyParser<string> {
    propName = 'position';

    isAsync(): boolean {
        return false;
    }

    processProperty(gameObj: MeshItem, position: string) {
        const pos = parseStrVector(position.trim());

        gameObj.meshes[0].translate(Axis.X, pos.x, Space.WORLD);
        gameObj.meshes[0].translate(Axis.Z, pos.z, Space.WORLD);
    }
}
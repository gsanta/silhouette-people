import { Axis, Space } from "babylonjs";
import { GameObject } from "../../../model/objects/game_object/GameObject";
import { AbstractPropertyParser, parseStrVector } from "../AbstractPropertyParser";

export class PositionPropertyParser extends AbstractPropertyParser<string> {
    propName = 'position';

    isAsync(): boolean {
        return false;
    }

    async processPropertyAsync(gameObj: GameObject, position: string) {
        const pos = parseStrVector(position.trim());

        gameObj.mesh.setAbsolutePosition(pos);
        // gameObj.meshes[0].translate(Axis.X, pos.x, Space.WORLD);
        // gameObj.meshes[0].translate(Axis.Z, pos.z, Space.WORLD);
        // gameObj.meshes[0].translate(Axis.Y, pos.y, Space.WORLD);
    }
}
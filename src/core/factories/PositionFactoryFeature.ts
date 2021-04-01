import { Axis, Space } from "babylonjs";
import { GameObj } from "../../model/objs/GameObj";
import { AbstractFactoryFeature, parseStrVector } from "./AbstractFactoryFeacture";

export class PositionFactoryFeature extends AbstractFactoryFeature {
    feature = 'Position';

    isAsync(): boolean {
        return false;
    }

    processFeature(gameObj: GameObj, attrs: string[]) {
        const [posStr] = attrs;
        const pos = parseStrVector(posStr.trim());

        gameObj.mainMesh.translate(Axis.X, pos.x, Space.WORLD);
        gameObj.mainMesh.translate(Axis.Z, pos.z, Space.WORLD);
        // gameObj.mainMesh.setAbsolutePosition(pos);
    }
}
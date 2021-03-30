import { GameObj } from "../../model/objs/GameObj";
import { AbstractFactoryFeature, parseStrVector } from "./AbstractFactoryFeacture";

export class PositionFactoryFeature extends AbstractFactoryFeature {
    feature = 'Position';

    isAsync(): boolean {
        return false;
    }

    processFeature(gameObj: GameObj, feature: string) {
        const [_feature, posStr] = feature.split(' ');
        const pos = parseStrVector(posStr.trim());

        gameObj.mainMesh.setAbsolutePosition(pos);
    }
}
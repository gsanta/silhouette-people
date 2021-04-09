import { GameObj } from "../../../model/objs/GameObj";
import { AbstractFactoryFeature } from "./AbstractFactoryFeacture";

export class IdFactoryFeature extends AbstractFactoryFeature {
    feature = 'Id';

    processFeature(gameObj: GameObj, attrs: string[]) {
        const [id] = attrs;
        gameObj.id = id;
    }
}
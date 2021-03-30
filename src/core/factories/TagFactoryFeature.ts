import { GameObj, GameObjTag } from "../../model/objs/GameObj";
import { AbstractFactoryFeature } from "./AbstractFactoryFeacture";


export class TagFactoryFeature extends AbstractFactoryFeature {
    feature = 'Tag';

    isAsync(): boolean {
        return false;
    }

    processFeature(gameObject: GameObj, attrs: string[]) {
        gameObject.tag.add(...(attrs as GameObjTag[]));
    }
}
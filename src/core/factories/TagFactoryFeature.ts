import { GameObj, GameObjTag } from "../../model/objs/GameObj";
import { AbstractFactoryFeature } from "./AbstractFactoryFeacture";


export class TagFactoryFeature extends AbstractFactoryFeature {
    feature = 'Tag';

    isAsync(): boolean {
        return false;
    }

    processFeature(gameObject: GameObj, feature: string) {
        const [_feature, ...rest] = feature.split(' ');
    
        gameObject.tag.add(...(rest as GameObjTag[]));
    }
}
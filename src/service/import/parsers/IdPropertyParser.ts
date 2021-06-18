import { GameObject } from "../../../model/objects/game_object/GameObject";
import { AbstractPropertyParser } from "../AbstractPropertyParser";

export class IdPropertyParser extends AbstractPropertyParser<string> {
    propName = 'id';

    processProperty(gameObj: GameObject, id: string) {
        gameObj.id = id;
    }
}
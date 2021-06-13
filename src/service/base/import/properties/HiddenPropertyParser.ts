import { GameObject } from "../../../../model/objects/game_object/GameObject";
import { AbstractPropertyParser } from "../AbstractPropertyParser";


export class HiddenPropertyParser extends AbstractPropertyParser<boolean> {
    propName = 'Hidden';

    processProperty(meshObj: GameObject, isHidden: boolean) {
        if (isHidden) {
            meshObj.visibility = true;
        }
    }
}
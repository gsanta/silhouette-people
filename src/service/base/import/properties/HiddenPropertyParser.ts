import { MeshItem } from "../../../../model/item/mesh/MeshItem";
import { AbstractPropertyParser } from "../AbstractPropertyParser";


export class HiddenPropertyParser extends AbstractPropertyParser<boolean> {
    propName = 'Hidden';

    processProperty(meshObj: MeshItem, isHidden: boolean) {
        if (isHidden) {
            meshObj.instance.setVisibility(false);
        }
    }
}
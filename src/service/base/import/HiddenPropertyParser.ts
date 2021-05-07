import { MeshObj } from "../../../model/object/mesh/MeshObj";
import { AbstractPropertyParser } from "./AbstractPropertyParser";


export class HiddenPropertyParser extends AbstractPropertyParser<boolean> {
    propName = 'Hidden';

    processProperty(meshObj: MeshObj, isHidden: boolean) {
        if (isHidden) {
            meshObj.instance.setVisibility(false);
        }
    }
}
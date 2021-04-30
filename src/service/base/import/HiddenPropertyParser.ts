import { MeshObj } from "../../../model/object/mesh/MeshObj";
import { AbstractPropertyParser } from "./AbstractPropertyParser";


export class HiddenPropertyParser extends AbstractPropertyParser {
    feature = 'Hidden';

    processFeature(meshObj: MeshObj) {
        meshObj.instance.setVisibility(false);
    }
}
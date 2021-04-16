import { MeshObj, MeshObjTag } from "../../objs/MeshObj";
import { AbstractFeatureParser } from "../AbstractFeactureParser";

export class TagFeatureParser extends AbstractFeatureParser {
    feature = 'Tag';

    isAsync(): boolean {
        return false;
    }

    processFeature(gameObject: MeshObj, attrs: string[]) {
        gameObject.tag.add(...(attrs as MeshObjTag[]));
    }
}
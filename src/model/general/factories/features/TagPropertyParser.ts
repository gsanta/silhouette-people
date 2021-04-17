import { MeshObj, MeshObjTag } from "../../objs/MeshObj";
import { AbstractPropertyParser } from "../AbstractPropertyParser";

export class TagPropertyParser extends AbstractPropertyParser {
    feature = 'Tag';

    isAsync(): boolean {
        return false;
    }

    processFeature(gameObject: MeshObj, attrs: string[]) {
        gameObject.tag.add(...(attrs as MeshObjTag[]));
    }
}
import { MeshObj, MeshObjTag } from "../../../model/object/mesh/MeshObj";
import { AbstractPropertyParser } from "./AbstractPropertyParser";

export class TagPropertyParser extends AbstractPropertyParser<string[]> {
    propName = 'tags';

    isAsync(): boolean {
        return false;
    }

    processProperty(gameObject: MeshObj, tags: string[]) {
        gameObject.tag.add(...(tags as MeshObjTag[]));
    }
}
import { MeshItem, MeshObjTag } from "../../../model/item/mesh/MeshItem";
import { AbstractPropertyParser } from "./AbstractPropertyParser";

export class TagPropertyParser extends AbstractPropertyParser<string[]> {
    propName = 'tags';

    isAsync(): boolean {
        return false;
    }

    processProperty(gameObject: MeshItem, tags: string[]) {
        gameObject.tag.add(...(tags as MeshObjTag[]));
    }
}
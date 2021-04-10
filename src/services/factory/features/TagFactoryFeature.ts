import { MeshObj, MeshObjTag } from "../../../model/objs/MeshObj";
import { AbstractFactoryFeature } from "./AbstractFactoryFeacture";


export class TagFactoryFeature extends AbstractFactoryFeature {
    feature = 'Tag';

    isAsync(): boolean {
        return false;
    }

    processFeature(gameObject: MeshObj, attrs: string[]) {
        gameObject.tag.add(...(attrs as MeshObjTag[]));
    }
}
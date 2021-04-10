import { MeshObj } from "../../../model/objs/MeshObj";
import { AbstractFactoryFeature } from "./AbstractFactoryFeacture";

export class IdFactoryFeature extends AbstractFactoryFeature {
    feature = 'Id';

    processFeature(gameObj: MeshObj, attrs: string[]) {
        const [id] = attrs;
        gameObj.id = id;
    }
}
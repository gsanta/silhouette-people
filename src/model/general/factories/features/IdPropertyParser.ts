import { MeshObj } from "../../objs/MeshObj";
import { AbstractPropertyParser } from "../AbstractPropertyParser";

export class IdPropertyParser extends AbstractPropertyParser {
    feature = 'Id';

    processFeature(gameObj: MeshObj, attrs: string[]) {
        const [id] = attrs;
        gameObj.id = id;
    }
}
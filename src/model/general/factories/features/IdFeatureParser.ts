import { MeshObj } from "../../objs/MeshObj";
import { AbstractFeatureParser } from "../AbstractFeactureParser";

export class IdFeatureParser extends AbstractFeatureParser {
    feature = 'Id';

    processFeature(gameObj: MeshObj, attrs: string[]) {
        const [id] = attrs;
        gameObj.id = id;
    }
}
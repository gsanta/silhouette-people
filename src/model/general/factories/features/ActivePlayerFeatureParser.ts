

import { MeshObj } from "../../objs/MeshObj";
import { AbstractFeatureParser } from "../AbstractFeactureParser";

export class ActivePlayerFeatureParser extends AbstractFeatureParser {
    feature = 'ActivePlayer';

    processFeature(gameObj: MeshObj) {
        gameObj.player.setActive(true);
    }
}
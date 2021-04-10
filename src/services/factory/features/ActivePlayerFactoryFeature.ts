

import { MeshObj } from "../../../model/objs/MeshObj";
import { AbstractFactoryFeature } from "./AbstractFactoryFeacture";

export class ActivePlayerFactoryFeature extends AbstractFactoryFeature {
    feature = 'ActivePlayer';

    processFeature(gameObj: MeshObj) {
        gameObj.player.setActive(true);
    }
}


import { GameObj } from "../../../model/objs/GameObj";
import { AbstractFactoryFeature } from "./AbstractFactoryFeacture";

export class ActivePlayerFactoryFeature extends AbstractFactoryFeature {
    feature = 'ActivePlayer';

    processFeature(gameObj: GameObj) {
        gameObj.player.setActive(true);
    }
}
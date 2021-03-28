import { GameObj } from "../../model/objs/GameObj";


export enum AddonName {
    PlayerHighlight = 'PlayerHighlight'
}

export abstract class AbstractAddon {
    name: AddonName;
    update(gameObj: GameObj) {}
}
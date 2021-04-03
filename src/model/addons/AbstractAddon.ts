import { GameObj } from "../objs/GameObj";


export enum AddonName {
    Highlight = 'Highlight',
    Transport = 'Transport'
}

export abstract class AbstractAddon {
    name: AddonName;
    update(gameObj: GameObj) {}
}
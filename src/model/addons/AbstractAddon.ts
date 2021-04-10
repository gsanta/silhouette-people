import { MeshObj } from "../objs/MeshObj";


export enum AddonName {
    Highlight = 'Highlight',
    Transport = 'Transport'
}

export abstract class AbstractAddon {
    name: AddonName;
    update(gameObj: MeshObj) {}
}
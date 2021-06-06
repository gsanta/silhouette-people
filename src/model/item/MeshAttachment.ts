import { MeshItem } from "./mesh/MeshItem";


export abstract class MeshAttachment {
    readonly name: string;
    readonly meshItem: MeshItem; 

    constructor(name: string, meshItem: MeshItem) {
        this.name = name;
        this.meshItem = meshItem;
    }

    onItemPositionChanged() {}
}
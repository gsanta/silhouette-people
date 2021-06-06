import { Attachments } from "./attachments/Attachments";
import { MeshItem } from "./mesh/MeshItem";

export const meshAttachmentHeight = 1;

export abstract class MeshAttachment<I extends MeshItem = MeshItem> {
    readonly name: Attachments;
    readonly meshItem: I; 

    constructor(name: Attachments, meshItem: I) {
        this.name = name;
        this.meshItem = meshItem;
    }

    onItemPositionChanged() {}
}
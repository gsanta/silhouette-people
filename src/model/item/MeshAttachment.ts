import { Attachments } from "./attachments/Attachments";
import { GameObject } from "../objects/game_object/GameObject";

export const meshAttachmentHeight = 1;

export abstract class MeshAttachment<I extends GameObject = GameObject> {
    readonly name: Attachments;
    readonly meshItem: I; 

    constructor(name: Attachments, meshItem: I) {
        this.name = name;
        this.meshItem = meshItem;
    }

    onItemPositionChanged() {}
}
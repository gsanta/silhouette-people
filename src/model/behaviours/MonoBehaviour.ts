import { MonoBehaviourName } from "./MonoBehaviourName";

export const meshAttachmentHeight = 1;

export abstract class MonoBehaviour {
    readonly name: MonoBehaviourName;

    constructor(name: MonoBehaviourName) {
        this.name = name;
    }

    onItemPositionChanged() {}
    update(deltaTime: number) {}
}
import { MeshObjTag } from "../objs/MeshObj";


export class TagComponent {
    private tags: Set<MeshObjTag> = new Set();

    add(...tag: MeshObjTag[]) {
        tag.forEach(t => this.tags.add(t));
    }

    has(...tag: MeshObjTag[]) {
        return tag.every(t => this.tags.has(t));
    }

    doesNotHave(...tag: MeshObjTag[]) {
        return tag.every(t => !this.tags.has(t));
    }

    remove(tag: MeshObjTag) {
        this.tags.delete(tag);
    }

    clear() {
        this.tags = new Set();
    }

    // most common tag shortcuts

    isPlayer() {
        return this.has(MeshObjTag.Player);
    }

    removePlayer() {
        this.remove(MeshObjTag.Player);
    }

    addPlayer() {
        this.add(MeshObjTag.Player);
    }
}
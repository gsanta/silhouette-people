import { MeshItemTag } from "./item/mesh/MeshItem";


export class TagHandler {
    private tags: Set<MeshItemTag> = new Set();

    add(...tag: MeshItemTag[]) {
        tag.forEach(t => this.tags.add(t));
    }

    has(...tag: MeshItemTag[]) {
        return tag.every(t => this.tags.has(t));
    }

    doesNotHave(...tag: MeshItemTag[]) {
        return tag.every(t => !this.tags.has(t));
    }

    remove(tag: MeshItemTag) {
        this.tags.delete(tag);
    }

    clear() {
        this.tags = new Set();
    }

    isPlayer() {
        return this.has(MeshItemTag.Player);
    }

    removePlayer() {
        this.remove(MeshItemTag.Player);
    }

    addPlayer() {
        this.add(MeshItemTag.Player);
    }
}
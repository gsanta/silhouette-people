import { GameObjTag } from "../../model/objs/GameObj";


export class TagComponent {
    private tags: Set<GameObjTag> = new Set();

    add(...tag: GameObjTag[]) {
        tag.forEach(t => this.tags.add(t));
    }

    has(...tag: GameObjTag[]) {
        return tag.every(t => this.tags.has(t));
    }

    doesNotHave(...tag: GameObjTag[]) {
        return tag.every(t => !this.tags.has(t));
    }

    remove(tag: GameObjTag) {
        this.tags.delete(tag);
    }

    clear() {
        this.tags = new Set();
    }

    // most common tag shortcuts

    isPlayer() {
        return this.has(GameObjTag.Player);
    }

    removePlayer() {
        this.remove(GameObjTag.Player);
    }

    addPlayer() {
        this.add(GameObjTag.Player);
    }
}
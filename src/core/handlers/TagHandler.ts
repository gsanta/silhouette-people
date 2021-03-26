import { GameObjTag } from "../../model/objs/GameObj";


export class TagHandler {
    private tags: Set<GameObjTag> = new Set();

    add(tag: GameObjTag) {
        this.tags.add(tag);
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
}
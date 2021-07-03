import { GameObjectTag } from "./objects/game_object/GameObject";


export class TagHandler {
    private tags: Set<GameObjectTag> = new Set();

    add(...tag: GameObjectTag[]) {
        tag.forEach(t => this.tags.add(t));
    }

    has(...tag: GameObjectTag[]) {
        return tag.every(t => this.tags.has(t));
    }

    doesNotHave(...tag: GameObjectTag[]) {
        return tag.every(t => !this.tags.has(t));
    }

    remove(tag: GameObjectTag) {
        this.tags.delete(tag);
    }

    clear() {
        this.tags = new Set();
    }

    isPlayer() {
        return this.has(GameObjectTag.Player);
    }

    removePlayer() {
        this.remove(GameObjectTag.Player);
    }

    addPlayer() {
        this.add(GameObjectTag.Player);
    }

    getAll(): Set<GameObjectTag> {
        return this.tags;
    }
}
import { GameObject, GameObjectTag } from "../../../model/objects/game_object/GameObject";
import { AbstractPropertyParser } from "../AbstractPropertyParser";

export class TagPropertyParser extends AbstractPropertyParser<string[]> {
    propName = 'tags';

    isAsync(): boolean {
        return false;
    }

    async processPropertyAsync(gameObject: GameObject, tags: string[]) {
        gameObject.tag.add(...(tags as GameObjectTag[]));
    }
}
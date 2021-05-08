import { CharacterItem } from "../model/item/character/CharacterItem";

export class CitizenStore {
    private objs: CharacterItem[] = [];

    addObj(gameObject: CharacterItem) {
        this.objs.push(gameObject);
    }

    getAll(): CharacterItem[] {
        return this.objs;
    }

    delete(citizen: CharacterItem) {
        this.objs = this.objs.filter(obj => obj !== citizen);
        citizen.dispose();
    }
}
import { CharacterObj } from "../model/object/character/CharacterObj";

export class CitizenStore {
    private objs: CharacterObj[] = [];

    addObj(gameObject: CharacterObj) {
        this.objs.push(gameObject);
    }

    getAll(): CharacterObj[] {
        return this.objs;
    }

    delete(citizen: CharacterObj) {
        this.objs = this.objs.filter(obj => obj !== citizen);
        citizen.dispose();
    }
}
import { InjectProperty } from "../di/diDecorators";
import { MeshObj, MeshObjTag, MeshObjType } from "../model/objs/MeshObj";
import { lookup } from "../services/Lookup";
import { QuarterStore } from "./QuarterStore";

export class MeshStore {
    private objs: MeshObj[] = [];

    @InjectProperty("QuarterStore")
    private quarterStore: QuarterStore;

    constructor() {
        this.quarterStore = lookup.quarterStore;
    }

    addObj(gameObject: MeshObj) {
        this.objs.push(gameObject);

        const quarterIndex = this.calcQuarterIndex(gameObject);
        gameObject.quarterIndex = quarterIndex;
    }

    getActivePlayer(): MeshObj {
        const players = this.getObjsByTag(MeshObjTag.Player);
        return players.find(player => player.player.isActive()) || players[0]; 
    }

    getObjsByTag(tag: MeshObjTag): MeshObj[] {
        return this.objs.filter(gameObj => gameObj.tag.has(tag));
    }

    getObjsByType(...type: MeshObjType[]): MeshObj[] {
        return this.objs.filter(obj => type.includes(obj.type)); 
    }

    getById(id: string) {
        return this.objs.find(obj => obj.id === id);
    }

    getAll(): MeshObj[] {
        return this.objs;
    }

    dispose() {
        this.objs.forEach(obj => obj.dispose());
    }

    private calcQuarterIndex(obj: MeshObj): number {
        const pos = obj.getPosition2D();

        const quarterIndex = this.quarterStore.getAllQuarters().findIndex(quarter => quarter.containsPoint2D(pos));
        return quarterIndex;
    }
}
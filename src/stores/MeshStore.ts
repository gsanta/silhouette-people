import { InjectProperty } from "../di/diDecorators";
import { BikeObj, HumanoidObj } from "../model/general/objs/CharacterObj";
import { MeshObj, MeshObjTag, MeshObjType } from "../model/general/objs/MeshObj";
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

    getActivePlayer(): HumanoidObj {
        return <HumanoidObj> this.getPlayers().find(player => player.isActivePlayer); 
    }

    getPlayers(): HumanoidObj[] {
        return <HumanoidObj[]> this.getObjsByTag(MeshObjTag.Player)
    }

    getBikes(): BikeObj[] {
        return <BikeObj[]> this.getObjsByTag(MeshObjTag.Bicycle);
    }

    getEnemies(): HumanoidObj[] {
        return <HumanoidObj[]> this.getObjsByTag(MeshObjTag.Enemy);
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
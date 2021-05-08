import { InjectProperty } from "../di/diDecorators";
import { BikeItem, PersonItem } from "../model/item/character/CharacterItem";
import { MeshItem, MeshObjTag, MeshObjType } from "../model/item/mesh/MeshItem";
import { lookup } from "../service/Lookup";
import { QuarterStore } from "./QuarterStore";

export class MeshStore {
    private objs: MeshItem[] = [];

    @InjectProperty("QuarterStore")
    private quarterStore: QuarterStore;

    constructor() {
        this.quarterStore = lookup.quarterStore;
    }

    addObj(gameObject: MeshItem) {
        this.objs.push(gameObject);

        const quarterIndex = this.calcQuarterIndex(gameObject);
        gameObject.quarterIndex = quarterIndex;
    }

    getActivePlayer(): PersonItem {
        return <PersonItem> this.getPlayers().find(player => player.isActivePlayer); 
    }

    getPlayers(): PersonItem[] {
        return <PersonItem[]> this.getObjsByTag(MeshObjTag.Player)
    }

    getBikes(): BikeItem[] {
        return <BikeItem[]> this.getObjsByTag(MeshObjTag.Bicycle);
    }

    getEnemies(): PersonItem[] {
        return <PersonItem[]> this.getObjsByTag(MeshObjTag.Enemy);
    }

    getObjsByTag(tag: MeshObjTag): MeshItem[] {
        return this.objs.filter(gameObj => gameObj.tag.has(tag));
    }

    getById(id: string) {
        return this.objs.find(obj => obj.id === id);
    }

    getAll(): MeshItem[] {
        return this.objs;
    }

    dispose() {
        this.objs.forEach(obj => obj.dispose());
    }

    private calcQuarterIndex(obj: MeshItem): number {
        const pos = obj.instance.getPosition2D();

        const quarterIndex = this.quarterStore.getAllQuarters().findIndex(quarter => quarter.containsPoint2D(pos));
        return quarterIndex;
    }
}
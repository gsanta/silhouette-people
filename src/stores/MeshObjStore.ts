import { WorldObj } from "../model/objs/WorldObj";
import { MeshObj, MeshObjType, MeshObjTag } from "../model/objs/MeshObj";
import { IMeshObjStore } from "./IMeshObjStore";

export class MeshObjStore implements IMeshObjStore {
    private objs: MeshObj[] = [];
    private district: WorldObj;

    constructor(district: WorldObj) {
        this.district = district;
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

    getObjById(id: string) {
        return this.objs.find(obj => obj.id === id);
    }

    getAllGameObjects(): MeshObj[] {
        return this.objs;
    }

    dispose() {
        this.objs.forEach(obj => obj.dispose());
    }

    private calcQuarterIndex(obj: MeshObj): number {
        const pos = obj.getPosition2D();

        const quarterIndex = this.district.quarter.getAllQuarters().findIndex(quarter => quarter.containsPoint2D(pos));
        return quarterIndex;
    }
}
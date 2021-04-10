import { MeshObj, MeshObjType, MeshObjTag } from "../model/objs/MeshObj";

export interface IMeshObjStore {
    addObj(gameObject: MeshObj);

    getActivePlayer(): MeshObj;

    getObjsByTag(tag: MeshObjTag): MeshObj[];

    getObjsByType(...type: MeshObjType[]): MeshObj[];

    getAll(): MeshObj[];

    dispose();
}
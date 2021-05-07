import { MeshObj } from "../../../model/object/mesh/MeshObj";
import { AbstractPropertyParser } from "./AbstractPropertyParser";

export class IdPropertyParser extends AbstractPropertyParser<string> {
    propName = 'id';

    processProperty(gameObj: MeshObj, id: string) {
        gameObj.id = id;
    }
}
import { MeshItem } from "../../../../model/item/mesh/MeshItem";
import { AbstractPropertyParser } from "../AbstractPropertyParser";

export class IdPropertyParser extends AbstractPropertyParser<string> {
    propName = 'id';

    processProperty(gameObj: MeshItem, id: string) {
        gameObj.id = id;
    }
}
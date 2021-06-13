import { MeshItem } from "../../../../model/item/mesh/MeshItem";
import { ActivePlayerService } from "../../../ActivePlayerService";
import { AbstractPropertyParser } from "../AbstractPropertyParser";

export class ActivePlayerPropertyParser extends AbstractPropertyParser<boolean> {
    propName = 'activePlayer';

    private highlightService: ActivePlayerService;

    constructor(highlightService: ActivePlayerService) {
        super();
        this.highlightService = highlightService;
    }

    processProperty(gameObj: MeshItem, isActive: boolean) {
        if (isActive) {
            this.highlightService.activate(gameObj);
        }
    }
}
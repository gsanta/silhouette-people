import { ActivePlayerService } from "../../../../services/ActivePlayerService";
import { MeshObj } from "../../objs/MeshObj";
import { AbstractPropertyParser } from "../AbstractPropertyParser";

export class ActivePlayerPropertyParser extends AbstractPropertyParser {
    feature = 'ActivePlayer';

    private highlightService: ActivePlayerService;

    constructor(highlightService: ActivePlayerService) {
        super();
        this.highlightService = highlightService;
    }

    processFeature(gameObj: MeshObj) {
        this.highlightService.activate(gameObj);
    }
}
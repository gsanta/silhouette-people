import { ActivePlayerService } from "../../../../services/ActivePlayerService";
import { MeshObj } from "../../objs/MeshObj";
import { AbstractFeatureParser } from "../AbstractFeactureParser";

export class ActivePlayerFeatureParser extends AbstractFeatureParser {
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
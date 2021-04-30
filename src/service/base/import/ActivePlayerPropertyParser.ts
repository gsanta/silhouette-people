import { ActivePlayerService } from "../../ActivePlayerService";
import { CharacterObj } from "../../../model/object/character/CharacterObj";
import { AbstractPropertyParser } from "./AbstractPropertyParser";

export class ActivePlayerPropertyParser extends AbstractPropertyParser {
    feature = 'ActivePlayer';

    private highlightService: ActivePlayerService;

    constructor(highlightService: ActivePlayerService) {
        super();
        this.highlightService = highlightService;
    }

    processFeature(gameObj: CharacterObj) {
        this.highlightService.activate(gameObj);
    }
}
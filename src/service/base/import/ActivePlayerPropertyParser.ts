import { ActivePlayerService } from "../../ActivePlayerService";
import { CharacterObj } from "../../../model/object/character/CharacterObj";
import { AbstractPropertyParser } from "./AbstractPropertyParser";

export class ActivePlayerPropertyParser extends AbstractPropertyParser<boolean> {
    propName = 'ActivePlayer';

    private highlightService: ActivePlayerService;

    constructor(highlightService: ActivePlayerService) {
        super();
        this.highlightService = highlightService;
    }

    processProperty(gameObj: CharacterObj, isActive: boolean) {
        if (isActive) {
            this.highlightService.activate(gameObj);
        }
    }
}
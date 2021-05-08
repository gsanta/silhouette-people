import { ActivePlayerService } from "../../ActivePlayerService";
import { CharacterItem } from "../../../model/item/character/CharacterItem";
import { AbstractPropertyParser } from "./AbstractPropertyParser";

export class ActivePlayerPropertyParser extends AbstractPropertyParser<boolean> {
    propName = 'ActivePlayer';

    private highlightService: ActivePlayerService;

    constructor(highlightService: ActivePlayerService) {
        super();
        this.highlightService = highlightService;
    }

    processProperty(gameObj: CharacterItem, isActive: boolean) {
        if (isActive) {
            this.highlightService.activate(gameObj);
        }
    }
}
import { GameObject } from "../../../../model/objects/game_object/GameObject";
import { ActivePlayerService } from "../../../ActivePlayerService";
import { AbstractPropertyParser } from "../AbstractPropertyParser";

export class ActivePlayerPropertyParser extends AbstractPropertyParser<boolean> {
    propName = 'activePlayer';

    private highlightService: ActivePlayerService;

    constructor(highlightService: ActivePlayerService) {
        super();
        this.highlightService = highlightService;
    }

    processProperty(gameObj: GameObject, isActive: boolean) {
        if (isActive) {
            this.highlightService.activate(gameObj);
        }
    }
}
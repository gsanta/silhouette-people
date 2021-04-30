import { CharacterObj } from "../CharacterObj";
import { RouteWalker } from "../RouteWalker";
import { LockedFeature } from "./LockedFeature";

export class LockedSpeed implements LockedFeature {
    private character: CharacterObj;
    private routeWalker: RouteWalker;

    constructor(routeWalker: RouteWalker, character: CharacterObj) {
        this.character = character;
        this.routeWalker = routeWalker;
    }
    
    update(deltaTime: number) {
        this.character.walker.setSpeed(0.04);
    }
}
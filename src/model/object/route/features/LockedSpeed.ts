import { CharacterObj } from "../../character/CharacterObj";
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
        const character = this.routeWalker.route.character;
        character.walker.setSpeed(0.04);
    }

    enableFeature() {
        const character = this.routeWalker.route.character;
        if (character.inputManager) {
            character.inputManager.disableSpeed();
        }
    }

    disableFeature() {
        const character = this.routeWalker.route.character;

        if (character.inputManager) {
            character.inputManager.enableSpeed();
        }
    }
}
import { CharacterItem } from "../../character/CharacterItem";
import { RouteWalker } from "../RouteWalker";
import { LockedFeature } from "./LockedFeature";

export class LockedSpeed implements LockedFeature {
    private character: CharacterItem;
    private routeWalker: RouteWalker;

    constructor(routeWalker: RouteWalker, character: CharacterItem) {
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
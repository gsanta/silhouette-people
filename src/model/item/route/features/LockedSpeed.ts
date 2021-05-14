import { RouteItem } from "../RouteItem";
import { RouteWalker } from "../RouteWalker";
import { LockedFeature } from "./LockedFeature";

export class LockedSpeed implements LockedFeature {
    private readonly routeWalker: RouteWalker;
    private readonly route: RouteItem;

    constructor(routeWalker: RouteWalker, route: RouteItem) {
        this.routeWalker = routeWalker;
        this.route = route;
    }
    
    update(deltaTime: number) {
        const character = this.route.character;
        character.walker.setSpeed(0.04);
    }

    enableFeature() {
        const character = this.route.character;
        
        if (character && character.inputManager) {
            character.inputManager.disableSpeed();
        }
    }

    disableFeature() {
        const character = this.route.character;

        if (character && character.inputManager) {
            character.inputManager.enableSpeed();
        }
    }
}
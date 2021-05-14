import { CharacterItem } from "../../character/CharacterItem";
import { RouteItem } from "../RouteItem";
import { RouteWalker } from "../RouteWalker";
import { RouteWalkerImpl } from "../RouteWalkerImpl";
import { LockedFeature } from "./LockedFeature";


export class LockedDirection implements LockedFeature {
    private routeWalker: RouteWalker;
    private route: RouteItem;

    constructor(routeWalker: RouteWalker, route: RouteItem) {
        this.routeWalker = routeWalker;
        this.route = route;
    }

    update(deltaTime: number) {
        const character = this.route.character;
        character.walker.character.instance.setRotation(this.getDirection());
    }

    private getDirection(): number {
        const destPoint = this.routeWalker.getDestPoint();
        const prevDestPoint = this.routeWalker.getPrevDestPoint();
        const dirVector = destPoint.subtract(prevDestPoint);
        const dirAngle = Math.atan2(dirVector.z, dirVector.x);

        return Math.PI / 2 - dirAngle;
    }

    enableFeature() {
        const character = this.route.character;
        if (character && character.inputManager) {
            character.inputManager.disableDirection();
        }
    }

    disableFeature() {
        const character = this.route.character;
        if (character && character.inputManager) {
            character.inputManager.enableDirection();
        }
    }
}
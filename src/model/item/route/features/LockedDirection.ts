import { CharacterItem } from "../../character/CharacterItem";
import { RouteWalker } from "../RouteWalker";
import { LockedFeature } from "./LockedFeature";


export class LockedDirection implements LockedFeature {
    private character: CharacterItem;
    private routeWalker: RouteWalker;

    constructor(routeWalker: RouteWalker, character: CharacterItem) {
        this.character = character;
        this.routeWalker = routeWalker;
    }

    update(deltaTime: number) {
        const character = this.routeWalker.route.character;
        character.walker.character.instance.setRotation(this.getDirection());
    }

    private getDirection(): number {
        const { toCheckPoint, fromCheckPoint } = this.routeWalker
        const dirVector = toCheckPoint.subtract(fromCheckPoint);
        const dirAngle = Math.atan2(dirVector.z, dirVector.x);

        return Math.PI / 2 - dirAngle;
    }

    enableFeature() {
        const character = this.routeWalker.route.character;
        if (character && character.inputManager) {
            character.inputManager.disableDirection();
        }
    }

    disableFeature() {
        const character = this.routeWalker.route.character;
        if (character && character.inputManager) {
            character.inputManager.enableDirection();
        }
    }
}
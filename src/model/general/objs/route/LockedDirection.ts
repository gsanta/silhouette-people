import { CharacterObj } from "../CharacterObj";
import { RouteWalker } from "../RouteWalker";
import { LockedFeature } from "./LockedFeature";


export class LockedDirection implements LockedFeature {
    private character: CharacterObj;
    private routeWalker: RouteWalker;

    constructor(routeWalker: RouteWalker, character: CharacterObj) {
        this.character = character;
        this.routeWalker = routeWalker;
    }

    update(deltaTime: number) {
        this.character.walker.character.instance.setRotation(this.getDirection());
    }

    private getDirection(): number {
        const { toCheckPoint, fromCheckPoint } = this.routeWalker
        const dirVector = toCheckPoint.subtract(fromCheckPoint);
        const dirAngle = Math.atan2(dirVector.z, dirVector.x);

        return Math.PI / 2 - dirAngle;
    }

    enableFeature() {
        this.character.inputManager.enableDirection();
    }

    disableFeature() {
        this.character.inputManager.disableDirection();
    }
}
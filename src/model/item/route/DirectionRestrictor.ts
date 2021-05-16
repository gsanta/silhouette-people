import { RouteWalker } from "./RouteWalker";

export class DirectionRestrictor {
    private routeWalker: RouteWalker;

    constructor(routeWalker: RouteWalker) {
        this.routeWalker = routeWalker;
    }

    update(deltaTime: number) {
        const character = this.routeWalker.getRoute().character;
        character.walker.character.instance.setRotation(this.getDirection());
    }

    private getDirection(): number {
        const destPoint = this.routeWalker.getDestPoint();
        const prevDestPoint = this.routeWalker.getPrevDestPoint();
        const dirVector = destPoint.p.subtract(prevDestPoint.p);
        const dirAngle = Math.atan2(dirVector.z, dirVector.x);

        return Math.PI / 2 - dirAngle;
    }

    on() {
        const character = this.routeWalker.getRoute().character;
        if (character && character.inputManager) {
            character.inputManager.disableDirection();
        }
    }

    off() {
        const character = this.routeWalker.getRoute().character;
        if (character && character.inputManager) {
            character.inputManager.enableDirection();
        }
    }
}
import { RouteWalker } from "./RouteWalker";

export class CharacterRouteWalker extends RouteWalker {
    protected updateCharacterState() {
        const { character } = this.route;

        character.setRotation(this.getDirection());
        character.walker.setSpeed(0.04);
    }

    private getDirection(): number {
        const dirVector = this.toCheckPoint.subtract(this.fromCheckPoint);
        const dirAngle = Math.atan2(dirVector.z, dirVector.x);

        return Math.PI / 2 - dirAngle;
    }
}
import { RouteWalker } from "./RouteWalker";

export class CharacterRouteWalker extends RouteWalker {
    protected walkCharacter(deltaTime: number) {
        const { character } = this.route;

        character.walker.walk(deltaTime);
        character.animationState.update();
    }

    protected stopCharacter() {
        const { character } = this.route;
        character.walker.setSpeed(0);
    }
}
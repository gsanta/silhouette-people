import { MeshObj } from "../../objs/MeshObj";
import { AbstractPropertyParser } from "../AbstractPropertyParser";

export class ParentBikePropertyParser extends AbstractPropertyParser {
    feature = 'Id';

    constructor() {}

    processFeature(gameObj: MeshObj, attrs: string[]) {
        const player = this.character;

        player.getMesh().setAbsolutePosition(new Vector3(0, 0, 0));
        player.setRotation(0);
        player.getMesh().parent = this.bike.getMesh();
        player.getMesh().checkCollisions = false;
        player.setParent(this.bike);

        player.animationState = new CharacterBikingState(player);
        this.bike.animationState = new BikeMovingState(this.bike);
    }
}

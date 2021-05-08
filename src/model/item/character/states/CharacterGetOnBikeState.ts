import { Vector3 } from "babylonjs";
import { BikeMovingState } from "../../bike/states/BikeMovingState";
import { BikeItem, PersonItem } from "../CharacterItem";
import { MeshState } from "../../mesh/MeshState";
import { CharacterBikingState } from "./CharacterBikingState";

export class CharacterGetOnBikeState extends MeshState {
    private bike: BikeItem;

    constructor(player: PersonItem, bike: BikeItem) {
        super(player);
        this.bike = bike;
        this.enterState();
    }

    enterState() {
        const player = this.character;

        player.instance.getMesh().setAbsolutePosition(new Vector3(0, 0, 0));
        player.instance.setRotation(0);
        player.instance.getMesh().parent = this.bike.instance.getMesh();
        player.instance.getMesh().checkCollisions = false;
        player.setParent(this.bike);

        player.animationState = new CharacterBikingState(player);
        this.bike.animationState = new BikeMovingState(this.bike);
    }
}
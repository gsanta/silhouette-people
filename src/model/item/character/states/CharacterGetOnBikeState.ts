import { Vector3 } from "babylonjs";
import { BikeMovingState } from "../../bike/states/BikeMovingState";
import { BikeItem, PersonItem } from "../CharacterItem";
import { MeshState } from "../../mesh/MeshState";
import { CharacterBikingState } from "./CharacterBikingState";
import { BikeIdleState } from "../../bike/states/BikeIdleState";
import { BikeMover } from "../../bike/states/BikeMover";

export class CharacterGetOnBikeState extends MeshState {
    private bike: BikeItem;

    constructor(player: PersonItem, bike: BikeItem) {
        super(player);
        this.bike = bike;
        this.enterState();
    }

    enterState() {
        const player = this.character;

        player.mesh.setAbsolutePosition(new Vector3(0, 0, 0));
        player.rotation = 0;;
        player.mesh.parent = this.bike.mesh;
        player.mesh.checkCollisions = false;
        player.setParent(this.bike);

        player.animationState = new CharacterBikingState(player);
        this.bike.animationState = new BikeIdleState(this.bike, <BikeMover> player.mover);
    }
}
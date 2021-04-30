import { MeshState } from "../../mesh/MeshState";
import { BikeMovingState } from "./BikeMovingState";

export class BikeIdleState extends MeshState {
    update() {
        this.changeStateIfNeeded();
    }

    private changeStateIfNeeded() {
        const { walker } = this.character;

        if (walker.getRotation() !== 0 || walker.getSpeed() !== 0) {
            this.character.animationState = new BikeMovingState(this.character); 
        }
    }
}
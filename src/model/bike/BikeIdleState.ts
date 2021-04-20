import { MeshState } from "../general/state/MeshState";
import { BikeMovingState } from "./BikeMovingState";

export class BikeIdleState extends MeshState {
    beforeRender() {
        this.changeStateIfNeeded();
    }

    private changeStateIfNeeded() {
        const { walker } = this.character;

        if (walker.getRotation() !== 0 || walker.getSpeed() !== 0) {
            this.character.state = new BikeMovingState(this.character); 
        }
    }
}
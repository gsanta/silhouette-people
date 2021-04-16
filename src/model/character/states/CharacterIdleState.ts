import { CharacterWalkingState } from "./CharacterWalkingState";
import { CharacterState } from "./CharacterState";
import { Character } from "../../general/objs/MeshObj";

export class CharacterIdleState extends CharacterState {

    constructor(player: Character) {
        super(player);
        this.enterState();
    }

    setSpeed(speed: number) {
        super.setSpeed(speed);

        this.changeStateIfNeeded();
    }

    setRotation(rotation: number) {
        super.setRotation(rotation);

        this.changeStateIfNeeded();
    }

    enterState() {
        this.meshObj.runAnimation('Idle');
    }

    private changeStateIfNeeded() {
        if (this.rotation !== 0 || this.speed !== 0) {
            this.meshObj.state = this.copState(new CharacterWalkingState(this.meshObj)); 
        }
    }
}

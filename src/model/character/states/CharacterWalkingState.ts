import { Axis, Space, Vector3 } from "babylonjs";
import { Character } from "../../general/objs/MeshObj";
import { CharacterIdleState } from "./CharacterIdleState";
import { CharacterState } from "./CharacterState";

export class CharacterWalkingState extends CharacterState {

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

    beforeRender(): void {
        const mesh = this.meshObj.getMesh();

        this.meshObj.move(this.speed);
        mesh.rotate(Axis.Y, this.rotation, Space.WORLD);
    }

    enterState() {
        this.meshObj.animation.runAnimation('Walk');
    }

    private changeStateIfNeeded() {
        if (this.rotation === 0 && this.speed === 0) {
            this.meshObj.state = this.copState(new CharacterIdleState(this.meshObj)); 
        }
    }
}

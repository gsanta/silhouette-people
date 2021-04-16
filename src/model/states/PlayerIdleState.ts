import { PlayerMovingState } from "./PlayerMovingState";
import { PlayerState } from "./PlayerState";

export class PlayerIdleState extends PlayerState {

    setSpeed(speed: number) {
        super.setSpeed(speed);

        if (this.speed !== 0) {
            this.player.state = this.copState(new PlayerMovingState(this.player)); 
        }
    }

    setRotation(rotation: number) {
        super.setRotation(rotation);

        if (this.rotation !== 0) {
            this.player.state = this.copState(new PlayerMovingState(this.player)); 
        }
    }

    enterState() {
        this.player.runAnimation('Idle');
    }
}

// export class PlayerIdleState extends AbstractMeshState {
//     @InjectProperty("KeyboardService")
//     private keyboardService: KeyboardService;

//     constructor(gameObject: MeshObj) {
//         super(MeshStateName.PlayerIdleState, gameObject);
//         this.keyboardService = lookup.keyboard;
//     }

//     keyboard(e: KeyboardEvent) {
//         if (!this.gameObject.tag.isPlayer()) { return undefined; }
//         if (!this.gameObject.player.isActive()) { return undefined; }

//         if (
//             this.keyboardService.checker.isMoveForward() ||
//             this.keyboardService.checker.isMoveBackward() ||
//             this.keyboardService.checker.isTurnLeft() ||
//             this.keyboardService.checker.isTurnRight()
//         ) {
//             this.gameObject.state.setState(new PlayerMovingState(this.gameObject));
//         }
//     }

//     enterState() {
//         this.gameObject.runAnimation('Idle');
//     }

//     exitState() {
//         this.gameObject.stopCurrentAnimation();
//     }
// }
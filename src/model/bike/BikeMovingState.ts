
import { Axis, Space, Vector3 } from "babylonjs";
import { InjectProperty } from "../../di/diDecorators";
import { lookup } from "../../services/Lookup";
import { WorldProvider } from "../../services/WorldProvider";
import { Bike } from "../general/objs/MeshObj";
import { BikeState } from "./BikeState";
import { BikeMasterPhysics } from "./physics/BikeMasterPhysics";

export class BikeMovingState extends BikeState {
    private physics: BikeMasterPhysics;

    @InjectProperty("WorldProvider")
    private worldProvider: WorldProvider;

    constructor(bike: Bike) {
        super(bike);

        this.worldProvider = lookup.worldProvider;
        this.physics = new BikeMasterPhysics(this.meshObj);
    }

    setPedalling(isPedalling: boolean) {
        super.setPedalling(isPedalling);

        return this;
    }
    
    beforeRender(): void {
        const deltaTime = this.worldProvider.world.engine.getDeltaTime();
        this.physics.update(deltaTime);
        this.updateMovement();
    }

    private updateMovement() {
        const mesh = this.meshObj.getMesh();

        
        const deltaTime = this.worldProvider.world.engine.getDeltaTime();
        const deltaTimeSec = deltaTime / 1000;
        const displacement = this.speed * deltaTimeSec;
        const displacementVec = new Vector3(displacement, displacement, displacement);
        const forwardDir = new Vector3(0, 0, 1);
        
        var direction = mesh.getDirection(forwardDir);
        direction.normalize().multiplyInPlace(displacementVec);
        mesh.moveWithCollisions(direction);

        mesh.rotate(Axis.Y, this.rotation, Space.LOCAL);
    }

    enterState() {
        this.meshObj.animation.runAnimation('Go');
    }
}

// export class BikeMovingState extends AbstractMeshState {
//     @InjectProperty("KeyboardService")
//     private keyboardService: KeyboardService;

//     @InjectProperty("WorldProvider")
//     private worldProvider: WorldProvider;
    
//     private readonly rotationSpeed = Math.PI / 30;
//     private speedPhysics: BikeSpeedupPhysics;
//     private rollingPhysics: BikeSlowdownPhysics;
//     private brakingPhysics: BikeSlowdownPhysics;
//     private reversePhysics: BikeReversePhysics;
//     private speed = 0;

//     private speedStates: Set<BikeSpeedState> = new Set();

//     constructor(gameObject: MeshObj) {
//         super(MeshStateName.BikeMovingState, gameObject);
//         this.keyboardService = lookup.keyboard;
//         this.worldProvider = lookup.worldProvider;

//         const speedRanges: [Vector2, Vector2][] = [
//             [ new Vector2(-1.6, -10 / 3.6), new Vector2(1.4, 2.5) ],
//             [ new Vector2(-0.1, 0), new Vector2(2, 5) ],
//             [ new Vector2(1.4, 10 / 3.6), new Vector2(4.4, 7.5) ]
//         ];

//         this.speedPhysics = new BikeSpeedupPhysics(gameObject, { gearSpeedRanges: speedRanges });
//         this.rollingPhysics = new BikeSlowdownPhysics(gameObject, 2.5);
//         this.brakingPhysics = new BikeSlowdownPhysics(gameObject, 5);
//         this.reversePhysics = new BikeReversePhysics(gameObject);
//     }

//     keyboard(e: KeyboardEvent, isKeyDown: boolean) {
//         if (isKeyDown) {
//             switch(e.key) {
//                 case '1':
//                     this.speedPhysics.setGear(0);
//                 break;
//                 case '2':
//                     this.speedPhysics.setGear(1);
//                 break;
//                 case '3':
//                     this.speedPhysics.setGear(2);
//                 break;
//                 case 'w':
//                     this.speedStates.add(BikeSpeedState.Accelerating);
//                 break;
//                 case 's':
//                     this.speedStates.add(BikeSpeedState.Braking);
//                 break;
//                 case 'r':
//                     this.speedStates.add(BikeSpeedState.Reverse);
//                 break;
//             }
//         } else {
//             switch(e.key) {
//                 case 'w':
//                     this.speedStates.delete(BikeSpeedState.Accelerating);
//                 break;
//                 case 's':
//                     this.speedStates.delete(BikeSpeedState.Braking);
//                 break;
//                 case 'r':
//                     this.speedStates.delete(BikeSpeedState.Reverse);
//                 break;
//             }
//         }
//     }

//     private updateSpeed() {
//         const deltaTime = this.worldProvider.world.engine.getDeltaTime();
//         const deltaTimeSec = deltaTime / 1000;

//         const dominantState = this.getDominantSpeedState();

//         switch(dominantState) {
//             case BikeSpeedState.Accelerating:
//                 this.speedPhysics.update(deltaTime);
//             break;
//             case BikeSpeedState.Braking:
//                 this.brakingPhysics.update(deltaTime);
//             break;
//             case BikeSpeedState.Reverse:
//                 this.reversePhysics.update(deltaTime);
//             break;
//             case BikeSpeedState.Rolling:
//                 this.rollingPhysics.update(deltaTime);
//             break;
//         }

//         this.speed = this.gameObject.data.getSpeed() * deltaTimeSec;
//     }

//     private updateRotation() {
//         const rotation = new Vector3(0, 0, 0);

//         if (this.keyboardService.activeKeys.has('a')) {
//             rotation.y -= this.rotationSpeed;
//         } else if (this.keyboardService.activeKeys.has('d')) {
//             rotation.y += this.rotationSpeed;
//         }

//         this.gameObject.rotation = rotation;
//     }

//     private updateMovement() {
//         const mesh = this.gameObject.colliderMesh ? this.gameObject.colliderMesh : this.gameObject.mainMesh;

//         const relativeDir = new Vector3(0, 0, 1);

//         var direction = this.gameObject.colliderMesh.getDirection(relativeDir);
//         direction.normalize().multiplyInPlace(new Vector3(this.speed, this.speed, this.speed));
//         mesh.moveWithCollisions(direction);

//         mesh.rotate(Axis.Y, this.gameObject.rotation.y, Space.LOCAL);
//     }

//     beforeRender(): void {
//         this.updateSpeed();
//         this.updateRotation();
//         this.updateMovement();
//     }

//     enterState() {
//         this.gameObject.runAnimation('Go');
//     }

//     exitState() {
//         this.gameObject.stopCurrentAnimation();
//     }

//     private getDominantSpeedState(): BikeSpeedState {
//         const speed = this.gameObject.data.getSpeed();
//         if (this.speedStates.has(BikeSpeedState.Braking)) {
//             return BikeSpeedState.Braking;
//         } else if (this.speedStates.has(BikeSpeedState.Accelerating)) {
//             return BikeSpeedState.Accelerating;
//         } else if (this.speedStates.has(BikeSpeedState.Reverse) && speed <= 0) {
//             return BikeSpeedState.Reverse;
//         } else {
//             return BikeSpeedState.Rolling;
//         }
//     }
// }
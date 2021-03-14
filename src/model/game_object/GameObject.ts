import { AnimationGroup, Mesh, Skeleton, Vector2, Vector3 } from "babylonjs";
import { AbstractCharacterState } from "./states/AbstractCharacterState";
import { IComponent } from "./components/IComponent";
import { GameObjectFactory } from "../GameObjectFactory";
import { World } from "../World";

export enum GameObjectRole {
    Player = 'Player',
    Enemy = 'Enemy',
    Static = 'Static'
}

export interface GameObjectJson {
    id: string;
    role: GameObjectRole;
    modelPath: string;
    position: Vector3;

    physics: boolean;
    input: boolean;    
    collider?: {
        dimensions: Vector3;
    };
    cameraTarget?: {
        relativPos: Vector3;
    };
}


export class GameObject {
    role: GameObjectRole;
    velocity: Vector3;
    rotation: Vector3 = new Vector3(0, 0, 0);
    mesh: Mesh;
    colliderMesh: Mesh;
    cameraTargetMesh: Mesh;
    skeleton: Skeleton;
    animationGroups: AnimationGroup[];

    state: AbstractCharacterState;

    miscComponents: IComponent[] = [];

    private currentAnimation: AnimationGroup;

    constructor(mesh: Mesh) {
        this.mesh = mesh;
    }

    debug(isDebug: boolean) {
        if (isDebug) {
            this.mesh && (this.mesh.showBoundingBox = true);
            this.colliderMesh && (this.colliderMesh.showBoundingBox = true);
            this.cameraTargetMesh && (this.cameraTargetMesh.showBoundingBox = true);
        } else {
            this.mesh && (this.mesh.showBoundingBox = false);
            this.colliderMesh && (this.colliderMesh.showBoundingBox = false);
            this.cameraTargetMesh && (this.cameraTargetMesh.showBoundingBox = false);
        }
    }

    move(speed: number) {
        var forward = new Vector3(0, 0, 1);
        var direction = this.mesh.getDirection(forward);
        direction.normalize().multiplyInPlace(new Vector3(speed, speed, speed));
        
        this.getMesh().moveWithCollisions(direction);
    }

    update(world: World) {
        let newState: AbstractCharacterState = undefined;

        if (this.state) {
            newState = this.state.updateInput();
            this.handleStateChangeIfNeeded(newState, world);
            if (!newState) {
                this.state.updateAnimation();
                newState = this.state.updatePhysics();
                this.handleStateChangeIfNeeded(newState, world);
            }
        }

        this.miscComponents.forEach(comp => comp.update(this, world));
    }

    get2dPos(): Vector2 {
        const pos = this.colliderMesh.getAbsolutePosition();
        return new Vector2(pos.x, pos.z);
    }

    isAnimationRunning(name: string) {
        return this.currentAnimation && this.currentAnimation.name === name;
    }

    runAnimation(name: string) {
        const animationGroup = this.animationGroups.find(group => group.name === name);
        if (animationGroup) {
            animationGroup.start(true);
            this.currentAnimation = animationGroup;
        }
    }

    stopCurrentAnimation() {
        if (this.currentAnimation) {
            this.currentAnimation.stop();
            this.currentAnimation = undefined;
        }
    } 

    private handleStateChangeIfNeeded(newState: AbstractCharacterState, world: World) {
        if (newState) {
            if (this.state) {
                this.state.exit();
            }
            this.state = newState;

            this.state.enter();
        }
    }

    private getMesh() {
        return this.colliderMesh ? this.colliderMesh : this.mesh;
    }

    static create(json: GameObjectJson, world: World) {
        return GameObjectFactory.create(json, world);
    }
}
import { Mesh, Vector3 } from "babylonjs";
import { AnimationGroup } from "babylonjs/Animations/animationGroup";
import { Skeleton } from "babylonjs/Bones/skeleton";
import { AbstractCharacterState } from "./character/ICharacterState";
import { IdleCharacterState } from "./character/IdleCharacterState";
import { IComponent } from "./components/IComponent";
import { GameObjectFactory } from "./GameObjectFactory";
import { World } from "./World";

export enum GameObjectType {
    Character = 'Character',
    Static = 'Static'
}

export interface GameObjectJson {
    id: string;
    type: GameObjectType;
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
    velocity: Vector3;
    rotation: Vector3 = new Vector3(0, 0, 0);
    mesh: Mesh;
    colliderMesh: Mesh;
    cameraTargetMesh: Mesh;
    skeleton: Skeleton;
    animationGroups: AnimationGroup[];

    state: AbstractCharacterState;

    inputComponent: IComponent;
    physicsComponent: IComponent;

    private currentAnimation: AnimationGroup;

    constructor(mesh: Mesh, startState?: AbstractCharacterState) {
        this.mesh = mesh;

        this.state = startState;
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

    update(world: World) {
        let newState: AbstractCharacterState = undefined;

        if (this.state) {
            newState = this.state.updateInput(this, world);
            this.handleStateChangeIfNeeded(newState, world);
            if (!newState) {
                this.state.updateAnimation(this, world);
                newState = this.state.updatePhysics(this, world);
                this.handleStateChangeIfNeeded(newState, world);
            }
        }
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
                this.state.exit(this, world);
            }
            this.state = newState;

            this.state.enter(this, world);
        }
    }

    static create(json: GameObjectJson, world: World) {
        return GameObjectFactory.create(json, world);
    }
}
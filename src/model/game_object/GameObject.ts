import { AnimationGroup, Mesh, Skeleton, Vector2, Vector3 } from "babylonjs";
import { AbstractCharacterState } from "./states/AbstractCharacterState";
import { IComponent } from "./components/IComponent";
import { World } from "../World";

export enum GameObjectType {
    Player = 'player',
    Enemy = 'enemy',
    Tree1 = 'tree1',
    Tree2 = 'tree2',
    Tree3 = 'tree3',
    Tree4 = 'tree4',
    Tree5 = 'tree5',
    Tree6 = 'tree6',
    House1 = 'house1',
    House2 = 'house2',
    House3 = 'house3',
}

export enum GameObjectRole {
    Player = 'Player',
    Enemy = 'Enemy',
    Static = 'Static',
}

export interface GameObjectJson {
    id?: string;
    type: GameObjectType;
    position: Vector3;
    modelPath?: string;
    texturePath?: string;

    colliderSize?: Vector3;
    rotation?: number;

    physics?: boolean;
    input?: boolean;    
    cameraTarget?: {
        relativPos: Vector3;
    };
}


export class GameObject {
    readonly id: string;
    readonly role: GameObjectRole;
    readonly mesh: Mesh;
    velocity: Vector3;
    rotation: Vector3 = new Vector3(0, 0, 0);
    colliderMesh: Mesh;
    cameraTargetMesh: Mesh;
    skeleton: Skeleton;
    animationGroups: AnimationGroup[];

    state: AbstractCharacterState;

    additionalComponents: IComponent[] = [];

    private currentAnimation: AnimationGroup;

    constructor(id: string, role: GameObjectRole, mesh: Mesh) {
        this.mesh = mesh;
        mesh.name = id;
        this.id = id;
        this.role = role;
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

        this.additionalComponents.forEach(comp => comp.update(this, world));
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
}
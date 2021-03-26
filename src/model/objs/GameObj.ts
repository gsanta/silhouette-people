import { AnimationGroup, Axis, Mesh, Quaternion, Skeleton, Space, Vector2, Vector3 } from "babylonjs";
import { IComponent } from "../IComponent";
import { World } from "../../services/World";
import { DistrictObj } from "./DistrictObj";
import { QuarterObj } from "./QuarterObj";
import { StateManager } from "../../core/handlers/StateManager";
import { TagHandler } from "../../core/handlers/TagHandler";

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
    Bicycle1 = 'bicycle1',
    Road1 = 'road1'
}

export enum GameObjTag {
    Player = 'Player',
    Enemy = 'Enemy',
    Bicycle = 'Bicycle'
}

export interface GameObjectJson {
    id?: string;
    type: GameObjectType;
    position: Vector3;
    modelPath?: string;
    texturePath?: string;
    textureMeshIndex?: number;

    colliderSize?: Vector3;
    rotation?: number;

    physics?: boolean;
    input?: boolean;    
    cameraTarget?: {
        relativPos: Vector3;
    };
}


export class GameObj {
    readonly id: string;
    readonly mesh: Mesh;
    // readonly location: LocationContext;
    velocity: Vector3;
    rotation: Vector3 = new Vector3(0, 0, 0);
    colliderMesh: Mesh;
    cameraTargetMesh: Mesh;
    skeleton: Skeleton;
    animationGroups: AnimationGroup[];
    allMeshes: Mesh[] = [];

    states: StateManager;
    readonly tags: TagHandler;

    additionalComponents: IComponent[] = [];

    private currentAnimation: AnimationGroup;

    district: DistrictObj;
    quarterIndex: number;

    private frontDirection: Vector3 = new Vector3(0, 0, 1);
    private frontDirection2D: Vector2 = new Vector2(0, 1);

    constructor(id: string, mesh: Mesh) {
        this.mesh = mesh;
        mesh.name = id;
        this.id = id;

        this.tags = new TagHandler();
        // this.location = new LocationContext();
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
        var forward = this.frontDirection;
        var direction = this.mesh.getDirection(forward);
        direction.normalize().multiplyInPlace(new Vector3(speed, speed, speed));
        
        this.getMesh().moveWithCollisions(direction);
    }

    getFrontDirection2D(): Vector2 {
        return this.frontDirection2D;
    }

    translate(axis: Vector3, amount: number) {
        this.getMesh().translate(axis, amount, Space.LOCAL);
    }

    setRotation(rotation: number) {
        this.getMesh().rotationQuaternion = Quaternion.RotationAxis(Axis.Y, rotation);
    }

    setColliderVisibility(isVisible: boolean) {
        if (this.colliderMesh) { this.colliderMesh.showBoundingBox = isVisible; }
    }

    setBoundingBoxVisibility(isVisible: boolean) {
        if (this.mesh) { this.mesh.showBoundingBox = isVisible; }
    }

    update(world: World) {
        if (this.states) {
            this.states.update();
        }

        this.additionalComponents.forEach(comp => comp.update(this, world));
    }

    getPosition2D(): Vector2 {
        const pos = this.getMesh().getAbsolutePosition();
        return new Vector2(pos.x, pos.z);
    }

    getQuarter(): QuarterObj {
        return this.district.activeComp.getQuarter(this.quarterIndex);
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

    getMesh() {
        return this.colliderMesh ? this.colliderMesh : this.mesh;
    }
}
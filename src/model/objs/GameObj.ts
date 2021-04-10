import { AnimationGroup, Axis, Mesh, Quaternion, Skeleton, Space, Vector2, Vector3 } from "babylonjs";
import { IComponent } from "../IComponent";
import { Lookup } from "../../services/Lookup";
import { WorldObj } from "./WorldObj";
import { QuarterObj } from "./QuarterObj";
import { StateComponent } from "../components/StateComponent";
import { TagComponent } from "../components/TagComponent";
import { MeshComponent } from "../components/MeshComponent";
import { AddonComponent } from "../components/AddonComponent";
import { PlayerComponent } from "../components/PlayerComponent";
import { BikeData } from "./BikeData";

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
    Road1 = 'road1',
    BusStop = 'busStop',
    DistrictBorder = 'DistrictBorder',
    QuarterGround = 'QuarterGround'
}

export enum GameObjTag {
    Player = 'Player',
    Enemy = 'Enemy',
    Bicycle = 'Bicycle',
    ActiveVehicle = 'ActiveVehicle'
}

export interface GameObjectJson {
    id?: string;
    ch: string;
    type: GameObjectType;
    position: Vector3;
    modelPath?: string;
    texturePath?: string;
    textureMeshIndex?: number;

    collider?: boolean | Vector3;
    rotation?: number;

    physics?: boolean;
    input?: boolean;    
    cameraTarget?: {
        relativPos: Vector3;
    };

    addons?: string[];
    features?: string[];
}


export class GameObj {
    id: string;
    mainMesh: Mesh;
    ch: string;
    type: GameObjectType;
    // readonly location: LocationContext;
    velocity: Vector3;
    rotation: Vector3 = new Vector3(0, 0, 0);
    colliderMesh: Mesh;
    cameraTargetMesh: Mesh;
    skeleton: Skeleton;
    animationGroups: AnimationGroup[];
    allMeshes: Mesh[] = [];

    state: StateComponent;
    readonly tag: TagComponent;
    readonly mesh: MeshComponent;
    readonly addon: AddonComponent;
    readonly player: PlayerComponent;
    readonly data: BikeData;

    additionalComponents: IComponent[] = [];

    private currentAnimation: AnimationGroup;

    readonly worldObj: WorldObj;
    quarterIndex: number;

    private frontDirection: Vector3 = new Vector3(0, 0, 1);
    private frontDirection2D: Vector2 = new Vector2(0, 1);

    constructor(id: string, worldObj: WorldObj, lookup: Lookup) {
        this.id = id;
        this.worldObj = worldObj;
        this.tag = new TagComponent();
        this.mesh = new MeshComponent(this);
        this.state = new StateComponent(undefined, lookup);
        this.addon = new AddonComponent();
        this.player = new PlayerComponent(this, worldObj, lookup);

        this.data = new BikeData();
    }

    debug(isDebug: boolean) {
        if (isDebug) {
            this.mainMesh && (this.mainMesh.showBoundingBox = true);
            this.colliderMesh && (this.colliderMesh.showBoundingBox = true);
            this.cameraTargetMesh && (this.cameraTargetMesh.showBoundingBox = true);
        } else {
            this.mainMesh && (this.mainMesh.showBoundingBox = false);
            this.colliderMesh && (this.colliderMesh.showBoundingBox = false);
            this.cameraTargetMesh && (this.cameraTargetMesh.showBoundingBox = false);
        }
    }

    move(speed: number) {
        var forward = this.frontDirection;
        var direction = this.mainMesh.getDirection(forward);
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
        if (this.mainMesh) { this.mainMesh.showBoundingBox = isVisible; }
    }

    update(world: Lookup) {
        if (!this.getMesh()) { return; }

        if (this.state) {
            this.state.update();
        }

        this.addon.getAll().forEach(addon => addon.update(this));

        this.additionalComponents.forEach(comp => comp.update(this, world));
    }

    getPosition2D(): Vector2 {
        const pos = this.getMesh().getAbsolutePosition();
        return new Vector2(pos.x, pos.z);
    }

    getPosition(): Vector3 {
        return this.getMesh().getAbsolutePosition();
    }

    getQuarter(): QuarterObj {
        return this.worldObj.quarter.getQuarter(this.quarterIndex);
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

    dispose() {
        this.allMeshes.forEach(mesh => mesh.dispose());
        if (this.colliderMesh) {
            this.colliderMesh.dispose();
        }
    }

    getMesh() {
        return this.colliderMesh ? this.colliderMesh : this.mainMesh;
    }
}
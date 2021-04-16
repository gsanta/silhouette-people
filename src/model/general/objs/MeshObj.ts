import { AnimationGroup, Axis, Mesh, Quaternion, Skeleton, Space, Vector2, Vector3 } from "babylonjs";
import { IComponent } from "../components/IComponent";
import { lookup, Lookup } from "../../../services/Lookup";
import { WorldObj } from "./WorldObj";
import { QuarterObj } from "./QuarterObj";
import { TagComponent } from "../components/TagComponent";
import { MeshComponent } from "../components/MeshComponent";
import { AddonComponent } from "../components/AddonComponent";
import { PlayerComponent } from "../components/PlayerComponent";
import { InjectProperty } from "../../../di/diDecorators";
import { QuarterStore } from "../../../stores/QuarterStore";
import { CharacterState } from "../../character/states/CharacterState";
import { BikeState } from "../../bike/BikeState";
import { MeshState } from "../state/MeshState";
import { Route } from "../../district/Route";

export enum MeshObjType {
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

export enum MeshObjTag {
    Player = 'Player',
    Enemy = 'Enemy',
    Bicycle = 'Bicycle',
    ActiveVehicle = 'ActiveVehicle'
}

export interface GameObjectJson {
    id?: string;
    ch: string;
    type: MeshObjType;
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

export type Character = MeshObj<CharacterState>;
export type Bike = MeshObj<BikeState>;

export class MeshObj<S extends MeshState<MeshObj> = any> {
    id: string;
    ch: string;
    type: MeshObjType;
    
    mainMesh: Mesh;
    colliderMesh: Mesh;
    skeleton: Skeleton;
    animationGroups: AnimationGroup[];
    allMeshes: Mesh[] = [];

    route: Route;

    state: S;
    additionalComponents: IComponent[] = [];
    readonly worldObj: WorldObj;
    quarterIndex: number;
    
    readonly tag: TagComponent;
    readonly mesh: MeshComponent;
    readonly addon: AddonComponent;
    readonly player: PlayerComponent;

    @InjectProperty("QuarterStore")
    private quarterStore: QuarterStore;

    private currentAnimation: AnimationGroup;

    private frontDirection: Vector3 = new Vector3(0, 0, 1);
    private frontDirection2D: Vector2 = new Vector2(0, 1);

    constructor(id: string, worldObj: WorldObj) {
        this.id = id;
        this.worldObj = worldObj;
        this.quarterStore = lookup.quarterStore;
        this.tag = new TagComponent();
        this.mesh = new MeshComponent(this);
        this.addon = new AddonComponent();
        this.player = new PlayerComponent(this as any, worldObj);
    }

    debug(isDebug: boolean) {
        if (isDebug) {
            this.mainMesh && (this.mainMesh.showBoundingBox = true);
            this.colliderMesh && (this.colliderMesh.showBoundingBox = true);
        } else {
            this.mainMesh && (this.mainMesh.showBoundingBox = false);
            this.colliderMesh && (this.colliderMesh.showBoundingBox = false);
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
        return this.quarterStore.getQuarter(this.quarterIndex);
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
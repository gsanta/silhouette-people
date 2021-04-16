import { Axis, Mesh, Quaternion, Skeleton, Vector2, Vector3 } from "babylonjs";
import { InjectProperty } from "../../../di/diDecorators";
import { lookup } from "../../../services/Lookup";
import { QuarterStore } from "../../../stores/QuarterStore";
import { BikeState } from "../../bike/BikeState";
import { CharacterState } from "../../character/states/CharacterState";
import { Route } from "../../district/Route";
import { AnimationHandler } from "../components/AnimationHandler";
import { TagHandler } from "../components/TagHandler";
import { MeshState } from "../state/MeshState";
import { GameObj } from "./GameObj";
import { QuarterObj } from "./QuarterObj";
import { WorldObj } from "./WorldObj";

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

export class MeshObj<S extends MeshState<MeshObj> = any> extends GameObj {
    id: string;
    ch: string;
    type: MeshObjType;
    
    mainMesh: Mesh;
    colliderMesh: Mesh;
    skeleton: Skeleton;
    allMeshes: Mesh[] = [];
    children: GameObj[] = [];
    isActivePlayer: boolean = false;

    route: Route;

    state: S;
    readonly worldObj: WorldObj;
    quarterIndex: number;
    
    readonly tag: TagHandler;
    readonly animation: AnimationHandler;

    @InjectProperty("QuarterStore")
    private quarterStore: QuarterStore;

    constructor(id: string, worldObj: WorldObj) {
        super();
        this.id = id;
        this.worldObj = worldObj;
        this.quarterStore = lookup.quarterStore;
        this.tag = new TagHandler();
        this.animation = new AnimationHandler();
    }

    setRotation(rotation: number) {
        this.getMesh().rotationQuaternion = Quaternion.RotationAxis(Axis.Y, rotation);
    }

    getRotation(): Vector3 {
        return this.getMesh().rotationQuaternion.toEulerAngles();
    }

    move(speed: number) {
        var forward = new Vector3(0, 0, 1);
        var direction = this.getMesh().getDirection(forward);
        direction.normalize().multiplyInPlace(new Vector3(speed, speed, speed));
        this.getMesh().moveWithCollisions(direction);

        this.children.forEach(child => child.setPosition(this.getPosition()));
    }

    setPosition2D(pos: Vector2) {
        this.getMesh().setAbsolutePosition(new Vector3(pos.x, this.getPosition().y, pos.y));
    }

    getPosition2D(): Vector2 {
        const pos = this.getMesh().getAbsolutePosition();
        return new Vector2(pos.x, pos.z);
    }

    setPosition(pos: Vector3) {
        this.getMesh().setAbsolutePosition(pos);

        this.children.forEach(child => child.setPosition(this.getPosition()));
    }

    getPosition(): Vector3 {
        const worldPos = this.worldObj.ground.getAbsolutePosition()
        return this.getMesh().getAbsolutePosition().subtract(worldPos);
    }

    getDimensions(): Vector3 {
        const mesh = this.getMesh();
        return mesh.getBoundingInfo().boundingBox.extendSizeWorld;
    }

    getQuarter(): QuarterObj {
        return this.quarterStore.getQuarter(this.quarterIndex);
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
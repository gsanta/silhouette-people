import { Mesh, Skeleton, Vector2, Vector3 } from "babylonjs";
import { InjectProperty } from "../../../di/diDecorators";
import { lookup } from "../../../services/Lookup";
import { QuarterStore } from "../../../stores/QuarterStore";
import { AnimationHandler } from "../components/AnimationHandler";
import { TagHandler } from "../components/TagHandler";
import { GameObj } from "./GameObj";
import { MeshInstance } from "./MeshInstance";
import { QuarterObj } from "./QuarterObj";
import { RouteObj } from "./RouteObj";
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

export class MeshObj extends GameObj {
    id: string;
    ch: string;
    type: MeshObjType;
    
    skeleton: Skeleton;
    children: GameObj[] = [];
    isActivePlayer: boolean = false;

    route: RouteObj;

    readonly worldObj: WorldObj;
    quarterIndex: number;
    
    readonly tag: TagHandler;
    readonly animation: AnimationHandler;

    @InjectProperty("QuarterStore")
    private quarterStore: QuarterStore;

    instance: MeshInstance;

    constructor(id: string, worldObj: WorldObj) {
        super();
        this.id = id;
        this.worldObj = worldObj;
        this.quarterStore = lookup.quarterStore;
        this.tag = new TagHandler();
        this.animation = new AnimationHandler();
    }

    setPosition(pos: Vector3): void {
        this.instance.setPosition(pos);
    }

    getPosition(): Vector3 {
        return this.instance.getPosition();
    }

    setPosition2D(pos: Vector2): void {
        this.instance.setPosition2D(pos);
    }

    move(speed: number) {
        var forward = new Vector3(0, 0, 1);
        var direction = this.instance.getMesh().getDirection(forward);
        direction.normalize().multiplyInPlace(new Vector3(speed, speed, speed));
        this.instance.getMesh().moveWithCollisions(direction);

        this.children.forEach(child => child.setPosition(this.getPosition()));
    }

    getQuarter(): QuarterObj {
        return this.quarterStore.getQuarter(this.quarterIndex);
    }

    dispose() {
        this.instance.dispose();
    }
}
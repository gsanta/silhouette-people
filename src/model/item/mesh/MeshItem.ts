import { Mesh, Skeleton, Vector2, Vector3 } from "babylonjs";
import { InjectProperty } from "../../../di/diDecorators";
import { lookup } from "../../../service/Lookup";
import { QuarterStore } from "../../../store/QuarterStore";
import { AnimationHandler } from "../../AnimationHandler";
import { TagHandler } from "../../TagHandler";
import { GameItem } from "../GameItem";
import { MeshInstance } from "./MeshInstance";
import { QuarterItem } from "../quarter/QuarterItem";
import { RouteItem } from "../route/RouteItem";
import { WorldObj } from "../WorldObj";

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

export enum MeshItemTag {
    Player = 'Player',
    Citizen = 'Citizen',
    Enemy = 'Enemy',
    Bicycle = 'Bicycle',
    ActiveVehicle = 'ActiveVehicle'
}

export interface MeshConfig {
    id?: string;
    ch: string;
    type: MeshObjType;

    props: {[key: string]: any};
}

export class MeshItem extends GameItem {
    id: string;
    
    skeleton: Skeleton;
    children: MeshItem[] = [];
    // TODO create tag from it
    isActivePlayer: boolean = false;

    route: RouteItem;

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

    getQuarter(): QuarterItem {
        return this.quarterStore.getQuarter(this.quarterIndex);
    }

    dispose() {
        this.instance.dispose();
    }
}
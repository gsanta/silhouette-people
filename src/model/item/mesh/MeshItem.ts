import { Skeleton, Vector2, Vector3 } from "babylonjs";
import { Mesh } from "babylonjs/Meshes/index";
import { InjectProperty } from "../../../di/diDecorators";
import { lookup } from "../../../service/Lookup";
import { QuarterStore } from "../../../store/QuarterStore";
import { AnimationHandler } from "../../AnimationHandler";
import { TagHandler } from "../../TagHandler";
import { GameItem } from "../GameItem";
import { QuarterItem } from "../quarter/QuarterItem";
import { WorldObj } from "../WorldObj";
import { MeshInstance } from "./MeshInstance";

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

    readonly worldObj: WorldObj;
    quarterIndex: number;
    
    readonly tag: TagHandler;
    readonly animation: AnimationHandler;

    @InjectProperty("QuarterStore")
    private quarterStore: QuarterStore;

    instance: MeshInstance;
    radius = 1;

    constructor(id: string, worldObj: WorldObj) {
        super();
        this.id = id;
        this.worldObj = worldObj;
        this.quarterStore = lookup.quarterStore;
        this.tag = new TagHandler();
        this.animation = new AnimationHandler();
    }

    moveWithCollision(displacement: Vector3) {
        this.mesh.moveWithCollisions(displacement);

        this.instance.emitPositionChange();
    }

    set position(pos: Vector3) {
        this.instance.setPosition(pos);
    }

    get position(): Vector3 {
        return this.instance.getPosition();
    }

    set position2D(pos: Vector2) {
        this.instance.setPosition2D(pos);
    }

    get position2D(): Vector2 {
        return this.instance.getPosition2D();
    }

    get quarter(): QuarterItem {
        return this.quarterStore.getQuarter(this.quarterIndex);
    }

    set rotation(rotation: number) {
        this.instance.setRotation(rotation);
    }

    get rotation() {
        return this.instance.getRotation().y;
    }

    set collisionMesh(mesh: Mesh) {
        this.instance.setColliderMesh(mesh);
    }

    get collisionMesh(): Mesh {
        return this.instance.getColliderMesh();
    }

    get mesh(): Mesh {
        return this.instance.getMesh();
    }

    get meshes(): Mesh[] {
        return this.instance.getAllMeshes();
    }

    set visibility(visibility: boolean) {
        this.instance.setVisibility(visibility);
    }

    dispose() {
        this.instance.dispose();
    }
}
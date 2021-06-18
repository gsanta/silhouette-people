import { Axis, Quaternion, Skeleton, Vector2, Vector3 } from "babylonjs";
import { Mesh } from "babylonjs/Meshes/index";
import { AnimationHandler } from "../../AnimationHandler";
import { TagHandler } from "../../TagHandler";
import { GameItem } from "../../item/GameItem";
import { CharacterBehaviour } from "./CharacterBehaviour";
import { InputController } from "./controller_input/InputController";
import { StateController } from "./controller_state/StateController";
import { MonoBehaviour } from "../../behaviours/MonoBehaviour";
import { RouteController } from "./controller_route/RouteController";
import { MotionController } from "./controller_motion/MotionController";
import { RouteControllerImpl } from "./controller_route/RouteControllerImpl";

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

export enum GameObjectTag {
    Player = 'Player',
    Citizen = 'Citizen',
    Enemy = 'Enemy',
    Bicycle = 'Bicycle',
    ActiveVehicle = 'ActiveVehicle'
}

export interface GameObjectConfig {
    id?: string;
    ch: string;
    type: GameObjectType;

    props: {[key: string]: any};
}

export class GameObject<B extends CharacterBehaviour = any> extends GameItem {
    id: string;

    collisionSensorDistance = 2;
    private _stateController: StateController;
    private _motionController: MotionController;
    inputController: InputController;
    private _routeController: RouteController;

    behaviour: B;
    private _behaviours: Map<string, MonoBehaviour> = new Map();
    
    skeleton: Skeleton;
    children: GameObject[] = [];
    // TODO create tag from it
    isActivePlayer: boolean = false;

    quarterIndex: number;
    
    readonly tag: TagHandler;
    readonly animation: AnimationHandler;

    private _collisionMesh: Mesh;
    private _meshes: Mesh[] = [];

    private positionChangeListeners: (() => void)[] = [];
    private attachments: MonoBehaviour[] = [];

    radius = 3;

    constructor(id: string) {
        super();
        this.id = id;
        this.tag = new TagHandler();
        this.animation = new AnimationHandler();
    }

    update(deltaTime: number) {
        this._behaviours.forEach((val) => val.update(deltaTime));
        // this.behaviours.forEach(behaviour => behaviour.update());
    }

    get routeController(): RouteController {
        return this._routeController;
    }

    set routeController(routeController: RouteController) {
        this._routeController = routeController;
        this._behaviours.set(routeController.name, routeController);
    }

    get motionController(): MotionController {
        return this._motionController;
    }

    set motionController(motionController: MotionController) {
        this._motionController = motionController;
        this._behaviours.set(motionController.name, motionController);
    }

    get stateController(): StateController {
        return this._stateController;
    }

    set stateController(stateController: StateController) {
        this._stateController = stateController;
        this._behaviours.set(stateController.name, stateController);
    }

    moveWithCollision(displacement: Vector3) {
        this.mesh.moveWithCollisions(displacement);

        this.emitPositionChange();
        this.attachments.forEach(attachment => attachment.onItemPositionChanged());
    }

    set position(pos: Vector3) {
        this.mesh.setAbsolutePosition(pos);

        this.emitPositionChange();
        this.attachments.forEach(attachment => attachment.onItemPositionChanged());
    }

    get position(): Vector3 {
        return this.mesh.getAbsolutePosition();
    }

    set position2D(pos: Vector2) {
        this.mesh.setAbsolutePosition(new Vector3(pos.x, this.position.y, pos.y));

        this.emitPositionChange();
        this.attachments.forEach(attachment => attachment.onItemPositionChanged());
    }

    get position2D(): Vector2 {
        const pos = this.mesh.getAbsolutePosition();
        return new Vector2(pos.x, pos.z);
    }

    set rotation(rotation: number) {
        this.mesh.rotationQuaternion = Quaternion.RotationAxis(Axis.Y, rotation);
    }

    get rotation() {
        return this.mesh.rotationQuaternion.toEulerAngles().y;
    }

    set collisionMesh(mesh: Mesh) {
        this._collisionMesh = mesh;
    }

    get collisionMesh(): Mesh {
        return this._collisionMesh;
    }

    get mesh(): Mesh {
        return this.collisionMesh ? this.collisionMesh : this.meshes[0];
    }

    get meshes(): Mesh[] {
        return this._meshes;
    }

    set meshes(meshes: Mesh[]) {
        this._meshes = meshes;
    }

    set visibility(visibility: boolean) {
        this.meshes.forEach(mesh => mesh.isVisible = visibility);
    }

    isCitizen() {
        return this.tag.has(GameObjectTag.Citizen);
    }

    addAttachment(attachment: MonoBehaviour) {
        this.attachments.push(attachment);
    }

    removeAttachment(name: string) {
        this.attachments = this.attachments.filter(attachment => attachment.name !== name);
    }

    addPositionChangeListener(callback: () => void) {
        this.positionChangeListeners.push(callback);
    }

    removePositionChangeListener(callback: () => void) {
        this.positionChangeListeners = this.positionChangeListeners.filter(listener => listener !== callback);
    }

    emitPositionChange() {
        this.positionChangeListeners.forEach(listener => listener());
        this.children.forEach(child => child.emitPositionChange())
    }

    dispose() {
        this.meshes.forEach(mesh => mesh.dispose());
        if (this.collisionMesh) {
            this.collisionMesh.dispose();
        }
    }
}
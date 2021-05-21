import { Axis, Space, Vector3 } from "babylonjs";
import { BikeItem, CharacterItem } from "../../character/CharacterItem";
import { MeshWalker } from "../../mesh/MeshWalker";
import { BikeMasterPhysics } from "../physics/BikeMasterPhysics";

export type PedalDirection = 'forward' | 'backward';

export class BikeWalker extends MeshWalker {
    private physics: BikeMasterPhysics;

    readonly rotationConst = Math.PI / 30;

    protected _isBraking = false
    protected _isPedalling = false;
    protected pedalDirection: PedalDirection = 'forward'; 
    protected gear: number = 0;

    constructor(bike: BikeItem) {
        super(bike);

        this.physics = new BikeMasterPhysics(this);
    }

    setBraking(isBraking: boolean): void {
        if (this._isBraking !== isBraking) {
            this._isDirty = true;
            this._isBraking = isBraking;
        }
    }

    isBraking(): boolean {
        return this._isBraking;
    }

    setPedalling(isPedalling: boolean): void {
        if (this._isPedalling !== isPedalling) {
            this._isDirty = true;
            this._isPedalling = isPedalling;
        }
    }

    isPedalling(): boolean {
        return this._isPedalling;
    }

    setPedalDirection(direction: PedalDirection): void {
        if (this.pedalDirection !== direction) {
            this._isDirty = true;
            this.pedalDirection = direction;
        }
    }

    getPedalDirection(): PedalDirection {
        return this.pedalDirection;
    }

    setGear(gear: number) {
        if (gear !== this.gear) {
            this.gear = gear;
            this._isDirty = true;
        }
    }

    getGear() {
        return this.gear;
    }

    walk(deltaTime: number) {
        const character = <CharacterItem> this.character.children[0];
        if (character.routeWalker && !character.routeWalker.isRunning()) {
            return;
        }

        this.physics.update(deltaTime);

        const mesh = this.character.instance.getMesh();
        
        const deltaTimeSec = deltaTime / 1000;
        const displacement = this.speed * deltaTimeSec;
        const displacementVec = new Vector3(displacement, displacement, displacement);
        const forwardDir = new Vector3(0, 0, 1);
        
        var direction = mesh.getDirection(forwardDir);
        direction.normalize().multiplyInPlace(displacementVec);
        // this.character.instance.moveWithCollision(displacement)
        this.character.instance.moveWithCollision(direction);

        mesh.rotate(Axis.Y, this.rotation, Space.LOCAL);
        // const mesh = this.character.instance.getMesh();

        // this.character.move(this.getSpeed());
        // mesh.rotate(Axis.Y, this.rotation, Space.WORLD);e
    }
}
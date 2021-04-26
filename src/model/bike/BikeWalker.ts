import { Axis, Space, Vector3 } from "babylonjs";
import { BikeObj } from "../general/objs/CharacterObj";
import { MeshWalker } from "../general/state/MeshWalker";
import { BikeMasterPhysics } from "./physics/BikeMasterPhysics";

export type PedalDirection = 'forward' | 'backward';

export class BikeWalker extends MeshWalker {
    private physics: BikeMasterPhysics;

    readonly rotationConst = Math.PI / 30;

    protected _isBraking = false
    protected _isPedalling = false;
    protected pedalDirection: PedalDirection = 'forward'; 
    protected gear: number = 0;

    constructor(bike: BikeObj) {
        super(bike);

        this.physics = new BikeMasterPhysics(<BikeObj> this.character);
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
        // this.physics.update(deltaTime);

        // const mesh = this.bike.getMesh();
        
        // const deltaTimeSec = deltaTime / 1000;
        // const displacement = this.speed * deltaTimeSec;
        // const displacementVec = new Vector3(displacement, displacement, displacement);
        // const forwardDir = new Vector3(0, 0, 1);
        
        // var direction = mesh.getDirection(forwardDir);
        // direction.normalize().multiplyInPlace(displacementVec);
        // mesh.moveWithCollisions(direction);

        // mesh.rotate(Axis.Y, this.rotation, Space.LOCAL);
        const mesh = this.character.getMesh();

        this.character.move(this.getSpeed());
        mesh.rotate(Axis.Y, this.rotation, Space.WORLD);
    }
}
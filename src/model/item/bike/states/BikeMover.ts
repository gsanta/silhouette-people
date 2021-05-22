import { Axis, Space, Vector3 } from "babylonjs";
import { BikeItem, CharacterItem } from "../../character/CharacterItem";
import { MeshMover } from "../../mesh/MeshMover";

export type PedalDirection = 'forward' | 'backward';

export class BikeMover extends MeshMover {
    readonly rotationConst = Math.PI / 30;

    protected _isBraking = false
    protected _isPedalling = false;
    protected pedalDirection: PedalDirection = 'forward'; 
    protected gear: number = 0;

    private bike: BikeItem;

    constructor(bike: BikeItem) {
        super(bike);

        this.bike = bike;
    }

    walk(deltaTime: number) {
        const character = <CharacterItem> this.character.children[0];
        if (character.routeWalker && !character.routeWalker.isRunning()) {
            return;
        }

        this.bike.animationState.update(deltaTime);

        const mesh = this.character.instance.getMesh();
        
        const deltaTimeSec = deltaTime / 1000;
        const displacement = this.speed * deltaTimeSec;
        const displacementVec = new Vector3(displacement, displacement, displacement);
        const forwardDir = new Vector3(0, 0, 1);
        
        var direction = mesh.getDirection(forwardDir);
        direction.normalize().multiplyInPlace(displacementVec);
        this.character.instance.moveWithCollision(direction);

        mesh.rotate(Axis.Y, this.rotation, Space.LOCAL);
    }
}
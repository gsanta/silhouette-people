
import { Axis, Space, Vector3 } from "babylonjs";
import { InjectProperty } from "../../di/diDecorators";
import { lookup } from "../../services/Lookup";
import { WorldProvider } from "../../services/WorldProvider";
import { Bike } from "../general/objs/MeshObj";
import { BikeState } from "./BikeState";
import { BikeMasterPhysics } from "./physics/BikeMasterPhysics";

export class BikeMovingState extends BikeState {
    private physics: BikeMasterPhysics;

    @InjectProperty("WorldProvider")
    private worldProvider: WorldProvider;

    constructor(bike: Bike) {
        super(bike);

        this.worldProvider = lookup.worldProvider;
        this.physics = new BikeMasterPhysics(this.meshObj);
    }

    setPedalling(isPedalling: boolean) {
        super.setPedalling(isPedalling);

        return this;
    }
    
    beforeRender(): void {
        const deltaTime = this.worldProvider.world.engine.getDeltaTime();
        this.physics.update(deltaTime);
        this.updateMovement();
    }

    private updateMovement() {
        const mesh = this.meshObj.getMesh();
        
        const deltaTime = this.worldProvider.world.engine.getDeltaTime();
        const deltaTimeSec = deltaTime / 1000;
        const displacement = this.speed * deltaTimeSec;
        const displacementVec = new Vector3(displacement, displacement, displacement);
        const forwardDir = new Vector3(0, 0, 1);
        
        var direction = mesh.getDirection(forwardDir);
        direction.normalize().multiplyInPlace(displacementVec);
        mesh.moveWithCollisions(direction);

        mesh.rotate(Axis.Y, this.rotation, Space.LOCAL);
    }

    enterState() {
        this.meshObj.animation.runAnimation('Go');
    }
}
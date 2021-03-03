import { Mesh, Vector3 } from "babylonjs";
import { IComponent } from "./components/IComponent";
import { InputComponent } from "./components/InputComponent";
import { PhysicsComponent } from "./components/PhyisicsComponent";
import { World } from "./World";


export class GameObject {
    velocity: Vector3;
    rotation: Vector3 = new Vector3(0, 0, 0);
    mesh: Mesh;

    private inputComponent: IComponent;
    private physicsComponent: IComponent;

    constructor(mesh: Mesh, inputComponent: InputComponent, physicsComponent: PhysicsComponent) {
        mesh.checkCollisions = true;
        mesh.showBoundingBox = true;
        this.mesh = mesh;
        this.inputComponent = inputComponent;
        this.physicsComponent = physicsComponent;
    }

    update(world: World) {
        this.inputComponent && this.inputComponent.update(this, world);
        this.physicsComponent && this.physicsComponent.update(this, world);
    }
}
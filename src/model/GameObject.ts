import { Mesh, Vector3 } from "babylonjs";
import { IComponent } from "./components/IComponent";
import { InputComponent } from "./components/InputComponent";
import { PhysicsComponent } from "./components/PhyisicsComponent";
import { GameObjectFactory } from "./GameObjectFactory";
import { World } from "./World";

export interface GameObjectJson {
    id: string;
    modelPath: string;
    position: Vector3;

    physics: boolean;
    input: boolean;    
    collider?: {
        dimensions: Vector3;
    };
    cameraTarget?: {
        relativPos: Vector3;
    };
}


export class GameObject {
    velocity: Vector3;
    rotation: Vector3 = new Vector3(0, 0, 0);
    mesh: Mesh;
    colliderMesh: Mesh;
    cameraTargetMesh: Mesh;

    inputComponent: IComponent;
    physicsComponent: IComponent;

    constructor(mesh: Mesh) {
        // mesh.checkCollisions = true;
        this.mesh = mesh;
    }

    debug(isDebug: boolean) {
        if (isDebug) {
            this.mesh && (this.mesh.showBoundingBox = true);
            this.colliderMesh && (this.colliderMesh.showBoundingBox = true);
            this.cameraTargetMesh && (this.cameraTargetMesh.showBoundingBox = true);
        } else {
            this.mesh && (this.mesh.showBoundingBox = false);
            this.colliderMesh && (this.colliderMesh.showBoundingBox = false);
            this.cameraTargetMesh && (this.cameraTargetMesh.showBoundingBox = false);
        }
    }

    update(world: World) {
        this.inputComponent && this.inputComponent.update(this, world);
        this.physicsComponent && this.physicsComponent.update(this, world);
    }

    static create(json: GameObjectJson, world: World) {
        return GameObjectFactory.create(json, world);
    }
}
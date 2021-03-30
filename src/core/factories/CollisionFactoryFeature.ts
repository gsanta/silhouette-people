import { Axis, MeshBuilder, Space, StandardMaterial } from "babylonjs";
import { Vector3 } from "babylonjs/Maths/math.vector";
import { GameObj, GameObjectJson } from "../../model/objs/GameObj";
import { World } from "../../services/World";
import { AbstractFactoryFeature, parseStrVector } from "./AbstractFactoryFeacture";


export class CollisionFactoryFeature extends AbstractFactoryFeature {
    private world: World;

    constructor(world: World) {
        super();
        this.world = world;
    }

    feature = 'Collider';

    isAsync() {
        return false;
    }

    processFeature(gameObj: GameObj, feature: string) {
        const [_feature, dimStr] = feature.split(' ');
    
        const dimensions = dimStr ? parseStrVector(dimStr) : gameObj.mesh.getDimensions();
        const position = gameObj.getPosition();

        const [width, depth, height] = [dimensions.x, dimensions.z, dimensions.y];
        const collider = MeshBuilder.CreateBox(`${gameObj.id}-collider`, { width, depth, height}, this.world.scene);
        collider.checkCollisions = true;
        gameObj.mainMesh.parent = collider;
        collider.setAbsolutePosition(position);
        collider.translate(Axis.Y, dimensions.y / 2, Space.WORLD);
        gameObj.mainMesh.translate(Axis.Y, -dimensions.y / 2, Space.LOCAL);
        
        const colliderMaterial = new StandardMaterial(`${gameObj.id}-collider-material`, this.world.scene);
        colliderMaterial.alpha = 0;
        collider.material = colliderMaterial;
        gameObj.colliderMesh = collider;
    }

    // process(gameObject: GameObj, json: GameObjectJson): void {
    //     if (!json.collider) { return; }

    //     const dimensions = this.getDimensions(gameObject, json);
    //     const [width, depth, height] = [dimensions.x, dimensions.z, dimensions.y];
    //     const collider = MeshBuilder.CreateBox(`${json.id}-collider`, { width, depth, height}, this.world.scene);
    //     collider.checkCollisions = true;
    //     gameObject.mainMesh.parent = collider;
    //     collider.setAbsolutePosition(json.position);
    //     collider.translate(Axis.Y, dimensions.y / 2, Space.WORLD);
    //     gameObject.mainMesh.translate(Axis.Y, -dimensions.y / 2, Space.LOCAL);
        
    //     const colliderMaterial = new StandardMaterial(`${json.id}-collider-material`, this.world.scene);
    //     colliderMaterial.alpha = 0;
    //     collider.material = colliderMaterial;
    //     gameObject.colliderMesh = collider;
    // }

    private getDimensions(obj: GameObj, json: GameObjectJson): Vector3 {
        if (json.collider === true) {
            return obj.mesh.getDimensions();
        } else {
            return <Vector3> json.collider;
        }
    }
}
import { Axis, MeshBuilder, Space, StandardMaterial } from "babylonjs";
import { GameObject } from "../../../model/objects/game_object/GameObject";
import { WorldProvider } from "../../WorldProvider";
import { AbstractPropertyParser, parseStrVector } from "../AbstractPropertyParser";

export interface CollisionPropertyConfig {
    dimension: string;
}

export class CollisionPropertyParser extends AbstractPropertyParser<CollisionPropertyConfig> {
    propName = 'collider';

    private readonly worldProvider: WorldProvider;

    constructor(worldProvider: WorldProvider) {
        super();

        this.worldProvider = worldProvider;
    }

    isAsync() {
        return false;
    }

    processProperty(gameObj: GameObject, props: CollisionPropertyConfig) {
        const dimensions = parseStrVector(props.dimension);
        const position = gameObj.position.clone();

        const [width, depth, height] = [dimensions.x, dimensions.z, dimensions.y];
        const collisionMesh = MeshBuilder.CreateBox(`${gameObj.id}-collider`, { width, depth, height}, this.worldProvider.scene);
        collisionMesh.checkCollisions = true;

        const mainMesh = gameObj.mesh;

        mainMesh.translate(Axis.X, -position.x, Space.WORLD);
        mainMesh.translate(Axis.Z, -position.z, Space.WORLD);

        mainMesh.parent = null;
        
        gameObj.collisionMesh = collisionMesh;
        gameObj.collisionMesh.parent = this.worldProvider.world.ground;

        mainMesh.parent = collisionMesh;
        collisionMesh.translate(Axis.X, position.x, Space.WORLD);
        collisionMesh.translate(Axis.Z, position.z, Space.WORLD);

        const colliderMaterial = new StandardMaterial(`${gameObj.id}-collider-material`, this.worldProvider.scene);
        colliderMaterial.alpha = 0;
        collisionMesh.material = colliderMaterial;
        
    }
}
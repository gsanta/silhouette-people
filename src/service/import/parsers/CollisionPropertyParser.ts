import { Axis, MeshBuilder, Space, StandardMaterial, Vector3 } from "babylonjs";
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

        const height = dimensions.y !== 0 ? dimensions.y : gameObj.getBoundingInfo().boundingBox.extendSizeWorld.y * 2;
        const depth = dimensions.z !== 0 ? dimensions.z : gameObj.getBoundingInfo().boundingBox.extendSizeWorld.z * 2;
        const width = dimensions.x !== 0 ? dimensions.x : gameObj.getBoundingInfo().boundingBox.extendSizeWorld.x * 2;

        const collisionMesh = MeshBuilder.CreateBox(`${gameObj.id}-collider`, { width, depth, height: height}, this.worldProvider.scene);
        collisionMesh.checkCollisions = true;

        const mainMesh = gameObj.mesh;
        mainMesh.parent = null;
        mainMesh.setAbsolutePosition(new Vector3(0, 0, 0));
        
        gameObj.collisionMesh = collisionMesh;

        mainMesh.parent = collisionMesh;

        collisionMesh.translate(Axis.X, position.x, Space.WORLD);
        collisionMesh.translate(Axis.Z, position.z, Space.WORLD);
        collisionMesh.translate(Axis.Y, position.y, Space.WORLD);
        collisionMesh.translate(Axis.Y, height / 2, Space.WORLD);

        mainMesh.translate(Axis.Y, -height / 2, Space.WORLD);
        const colliderMaterial = new StandardMaterial(`${gameObj.id}-collider-material`, this.worldProvider.scene);
        colliderMaterial.alpha = 0;
        collisionMesh.material = colliderMaterial;
        
    }
}
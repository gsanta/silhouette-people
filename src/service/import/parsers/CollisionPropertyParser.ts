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

        const meshHeight = dimensions.y !== 0 ? dimensions.y : gameObj.getBoundingInfo().boundingBox.extendSizeWorld.y * 2;
        const [width, depth, height] = [dimensions.x, dimensions.z, dimensions.y];
        const collisionMesh = MeshBuilder.CreateBox(`${gameObj.id}-collider`, { width, depth, height: meshHeight}, this.worldProvider.scene);
        collisionMesh.checkCollisions = true;
        // collisionMesh.setPivotPoint(new Vector3(0, -dimensions.y, 0));
        // collisionMesh.setAbsolutePosition(position);

        const mainMesh = gameObj.mesh;
        mainMesh.parent = null;
        mainMesh.setAbsolutePosition(new Vector3(0, 0, 0));
        
        gameObj.collisionMesh = collisionMesh;
        // gameObj.collisionMesh.parent = this.worldProvider.world.ground;

        // if (mainMesh.getBoundingInfo) {
        //     const mainMeshHeight = mainMesh.getBoundingInfo().boundingBox.extendSizeWorld.y;
        //     const collisionMeshHeight = collisionMesh.getBoundingInfo().boundingBox.extendSizeWorld.y;
    
        //     const diffY = collisionMeshHeight - mainMeshHeight;
        //     collisionMesh.translate(Axis.Y, diffY, Space.WORLD);
        //     mainMesh.parent = collisionMesh;
        //     mainMesh.translate(Axis.Y, -diffY, Space.LOCAL);
        // }

        mainMesh.parent = collisionMesh;

        // mainMesh.translate(Axis.X, -position.x, Space.WORLD);
        // mainMesh.translate(Axis.Z, -position.z, Space.WORLD);
        // mainMesh.translate(Axis.Y, -dimensions.y / 2, Space.WORLD);


        // mainMesh.setParent(gameObj.collisionMesh);

        // mainMesh.parent = collisionMesh;
        collisionMesh.translate(Axis.X, position.x, Space.WORLD);
        collisionMesh.translate(Axis.Z, position.z, Space.WORLD);
        collisionMesh.translate(Axis.Y, meshHeight / 2, Space.WORLD);
        if (!dimensions.y) {
            mainMesh.translate(Axis.Y, -meshHeight / 2, Space.WORLD);
        }
        // collisionMesh.setAbsolutePosition(position);

        
        // collisionMesh.translate(Axis.Y, dimensions.y / 2, Space.WORLD);

        const colliderMaterial = new StandardMaterial(`${gameObj.id}-collider-material`, this.worldProvider.scene);
        colliderMaterial.alpha = 0;
        collisionMesh.material = colliderMaterial;
        
    }
}
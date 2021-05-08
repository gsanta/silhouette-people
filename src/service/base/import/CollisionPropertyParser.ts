import { Axis, MeshBuilder, Space, StandardMaterial } from "babylonjs";
import { MeshItem } from "../../../model/item/mesh/MeshItem";
import { WorldObj } from "../../../model/item/WorldObj";
import { Lookup } from "../../Lookup";
import { WorldProvider } from "../../object/world/WorldProvider";
import { AbstractPropertyParser, parseStrVector } from "./AbstractPropertyParser";

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

    processProperty(gameObj: MeshItem, props: CollisionPropertyConfig) {
        const dimensions = parseStrVector(props.dimension);
        const position = gameObj.getPosition().clone();

        const [width, depth, height] = [dimensions.x, dimensions.z, dimensions.y];
        const collider = MeshBuilder.CreateBox(`${gameObj.id}-collider`, { width, depth, height}, this.worldProvider.scene);
        collider.checkCollisions = true;

        const mainMesh = gameObj.instance.getMesh();

        mainMesh.translate(Axis.X, -position.x, Space.WORLD);
        mainMesh.translate(Axis.Z, -position.z, Space.WORLD);

        mainMesh.parent = null;
        
        gameObj.instance.setColliderMesh(collider);
        gameObj.instance.getColliderMesh().parent = this.worldProvider.world.ground;

        mainMesh.parent = collider;
        collider.translate(Axis.X, position.x, Space.WORLD);
        collider.translate(Axis.Z, position.z, Space.WORLD);

        const colliderMaterial = new StandardMaterial(`${gameObj.id}-collider-material`, this.worldProvider.scene);
        colliderMaterial.alpha = 0;
        collider.material = colliderMaterial;
        
    }
}
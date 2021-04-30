import { Axis, MeshBuilder, Space, StandardMaterial } from "babylonjs";
import { MeshObj } from "../../../model/object/mesh/MeshObj";
import { WorldObj } from "../../../model/object/WorldObj";
import { Lookup } from "../../Lookup";
import { AbstractPropertyParser, parseStrVector } from "./AbstractPropertyParser";


export class CollisionPropertyParser extends AbstractPropertyParser {
    private lookup: Lookup;
    private worldObj: WorldObj;

    constructor(worldObj: WorldObj, lookup: Lookup) {
        super();
        this.worldObj = worldObj;
        this.lookup = lookup;
    }

    feature = 'Collider';

    isAsync() {
        return false;
    }

    processFeature(gameObj: MeshObj, attrs: string[]) {
        const dimStr = attrs[0];
    
        const dimensions = dimStr ? parseStrVector(dimStr) : gameObj.instance.getDimensions();
        const position = gameObj.getPosition().clone();

        const [width, depth, height] = [dimensions.x, dimensions.z, dimensions.y];
        const collider = MeshBuilder.CreateBox(`${gameObj.id}-collider`, { width, depth, height}, this.lookup.scene);
        collider.checkCollisions = true;

        const mainMesh = gameObj.instance.getMesh();

        mainMesh.translate(Axis.X, -position.x, Space.WORLD);
        mainMesh.translate(Axis.Z, -position.z, Space.WORLD);

        mainMesh.parent = null;
        
        gameObj.instance.setColliderMesh(collider);
        gameObj.instance.getColliderMesh().parent = this.worldObj.ground;

        mainMesh.parent = collider;
        collider.translate(Axis.X, position.x, Space.WORLD);
        collider.translate(Axis.Z, position.z, Space.WORLD);

        const colliderMaterial = new StandardMaterial(`${gameObj.id}-collider-material`, this.lookup.scene);
        colliderMaterial.alpha = 0;
        collider.material = colliderMaterial;
        
    }
}
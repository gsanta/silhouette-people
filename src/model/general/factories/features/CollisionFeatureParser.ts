import { Axis, MeshBuilder, Space, StandardMaterial } from "babylonjs";
import { MeshObj } from "../../objs/MeshObj";
import { WorldObj } from "../../objs/WorldObj";
import { Lookup } from "../../../../services/Lookup";
import { AbstractFeatureParser, parseStrVector } from "../AbstractFeactureParser";


export class CollisionFeatureParser extends AbstractFeatureParser {
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
    
        const dimensions = dimStr ? parseStrVector(dimStr) : gameObj.mesh.getDimensions();
        const position = gameObj.mesh.getPositionRelativeToDistrict();

        const [width, depth, height] = [dimensions.x, dimensions.z, dimensions.y];
        const collider = MeshBuilder.CreateBox(`${gameObj.id}-collider`, { width, depth, height}, this.lookup.scene);
        collider.checkCollisions = true;

        const mainMesh = gameObj.getMesh();

        mainMesh.translate(Axis.X, -position.x, Space.WORLD);
        mainMesh.translate(Axis.Z, -position.z, Space.WORLD);

        mainMesh.parent = null;
        
        gameObj.colliderMesh = collider;
        gameObj.colliderMesh.parent = this.worldObj.ground;

        mainMesh.parent = collider;
        collider.translate(Axis.X, position.x, Space.WORLD);
        collider.translate(Axis.Z, position.z, Space.WORLD);

        const colliderMaterial = new StandardMaterial(`${gameObj.id}-collider-material`, this.lookup.scene);
        colliderMaterial.alpha = 0;
        collider.material = colliderMaterial;
        
    }
}
import { Axis, MeshBuilder, Space, StandardMaterial } from "babylonjs";
import { GameObj } from "../../model/objs/GameObj";
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

    processFeature(gameObj: GameObj, attrs: string[]) {
        const dimStr = attrs[0];
    
        const dimensions = dimStr ? parseStrVector(dimStr) : gameObj.mesh.getDimensions();
        const position = gameObj.mesh.getPositionRelativeToDistrict();

        const [width, depth, height] = [dimensions.x, dimensions.z, dimensions.y];
        const collider = MeshBuilder.CreateBox(`${gameObj.id}-collider`, { width, depth, height}, this.world.scene);
        collider.checkCollisions = true;

        const mainMesh = gameObj.getMesh();

        mainMesh.translate(Axis.X, -position.x, Space.WORLD);
        mainMesh.translate(Axis.Z, -position.z, Space.WORLD);

        mainMesh.parent = null;
        
        gameObj.colliderMesh = collider;
        gameObj.colliderMesh.parent = this.world.districtStore.getActiveDistrict().basicComp.platform;

        mainMesh.parent = collider;
        collider.translate(Axis.X, position.x, Space.WORLD);
        collider.translate(Axis.Z, position.z, Space.WORLD);

        const colliderMaterial = new StandardMaterial(`${gameObj.id}-collider-material`, this.world.scene);
        colliderMaterial.alpha = 0;
        collider.material = colliderMaterial;
        
    }
}
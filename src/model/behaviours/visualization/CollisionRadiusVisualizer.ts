import { Color3, Mesh, MeshBuilder, StandardMaterial } from "babylonjs";
import { toVector3 } from "../../../helpers";
import { SceneService } from "../../../service/SceneService";
import { GameObject } from "../../objects/game_object/GameObject";
import { MonoBehaviour, meshAttachmentHeight } from "../MonoBehaviour";
import { MonoBehaviourName } from "../MonoBehaviourName";

export class CollisionRadiusVisualizer extends MonoBehaviour {
    private readonly _character: GameObject;
    private _mesh: Mesh;
    private readonly worldProvider: SceneService;

    constructor(character: GameObject, worldProvider: SceneService) {
        super(MonoBehaviourName.COLLISION_RADIUS_VISUALIZER);
        this._character = character;
        this.worldProvider = worldProvider;
        this.createMesh();
    }

    onItemPositionChanged() {
        if (this._mesh) {
            const pos = toVector3(this._character.position2D, meshAttachmentHeight);
            this._mesh.setAbsolutePosition(pos);
        }
    }

    private createMesh() {
        const options = {
            height: 0.1,
            diameterTop: this._character.radius,
            diameterBottom: this._character.radius
        }

        this._mesh = MeshBuilder.CreateCylinder(`${this._character.id}-collision-avoidance-mesh`, options, this.worldProvider.scene);
        this._mesh.position.y = meshAttachmentHeight;

        const material = new StandardMaterial(`${this._character.id}-collision-avoidance-material`, this.worldProvider.scene);
        this._mesh.material = material;
        material.diffuseColor = Color3.Blue();
        material.alpha = 0.5;
    }
}
import { MeshBuilder, LinesMesh } from "babylonjs";
import { numToVector3 } from "../../../helpers";
import { WorldProvider } from "../../../service/WorldProvider";
import { GameObject } from "../../objects/game_object/GameObject";
import { MonoBehaviour, meshAttachmentHeight } from "../MonoBehaviour";
import { MonoBehaviourName } from "../MonoBehaviourName";

export class CollisionVecVisualizer extends MonoBehaviour {
    private readonly character: GameObject;
    private _mesh: LinesMesh;
    private worldProvider: WorldProvider;

    constructor(character: GameObject, worldProvider: WorldProvider) {
        super(MonoBehaviourName.COLLISION_VEC_VISUALIZER);
        this.character = character;
        this.worldProvider = worldProvider;

        this.createOrUpdateMesh();
    }

    onItemPositionChanged() {
        this.createOrUpdateMesh();
    }

    private createOrUpdateMesh() {
        const vec = this.character.motionController.velocity.multiply(numToVector3(this.character.collisionSensorDistance));
        const startPos = this.character.position.clone();
        const endPos = startPos.add(vec);
        startPos.y = meshAttachmentHeight;
        endPos.y = meshAttachmentHeight;

        const options = {
            points: [startPos, endPos],
            updatable: true,
            instance: this._mesh
        }

        this._mesh = MeshBuilder.CreateLines(`${this.character.id}-collision-vector-mesh`, options, this.worldProvider.scene);
    }
}
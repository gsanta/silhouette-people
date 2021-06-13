import { MeshBuilder, LinesMesh } from "babylonjs";
import { numToVector3 } from "../../../helpers";
import { WorldProvider } from "../../../service/WorldProvider";
import { GameObject } from "../../objects/game_object/GameObject";
import { MeshAttachment, meshAttachmentHeight } from "../MeshAttachment";
import { Attachments } from "./Attachments";

export class CollisionVecVisualizerAttachment extends MeshAttachment<GameObject> {
    private _mesh: LinesMesh;
    private worldProvider: WorldProvider;

    constructor(character: GameObject, worldProvider: WorldProvider) {
        super(Attachments.COLLISION_VEC_VISUALIZER, character);
        this.worldProvider = worldProvider;

        this.createOrUpdateMesh();
    }

    onItemPositionChanged() {
        this.createOrUpdateMesh();
    }

    private createOrUpdateMesh() {
        const vec = this.meshItem.characterController.velocity.multiply(numToVector3(this.meshItem.collisionSensorDistance));
        const startPos = this.meshItem.position.clone();
        const endPos = startPos.add(vec);
        startPos.y = meshAttachmentHeight;
        endPos.y = meshAttachmentHeight;

        const options = {
            points: [startPos, endPos],
            updatable: true,
            instance: this._mesh
        }

        this._mesh = MeshBuilder.CreateLines(`${this.meshItem.id}-collision-vector-mesh`, options, this.worldProvider.scene);
    }
}
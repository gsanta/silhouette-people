import { Color3, Mesh, MeshBuilder, StandardMaterial } from "babylonjs";
import { toVector3 } from "../../../helpers";
import { WorldProvider } from "../../../service/WorldProvider";
import { MeshItem } from "../mesh/MeshItem";
import { MeshAttachment, meshAttachmentHeight } from "../MeshAttachment";
import { Attachments } from "./Attachments";

export class CollisionRadiusVisualizerAttachment extends MeshAttachment {
    private _mesh: Mesh;
    private readonly worldProvider: WorldProvider;

    constructor(meshItem: MeshItem, worldProvider: WorldProvider) {
        super(Attachments.COLLISION_RADIUS_VISUALIZER, meshItem);
        this.worldProvider = worldProvider;
        this.createMesh();
    }

    onItemPositionChanged() {
        if (this._mesh) {
            const pos = toVector3(this.meshItem.position2D, meshAttachmentHeight);
            this._mesh.setAbsolutePosition(pos);
        }
    }

    private createMesh() {
        const options = {
            height: 0.1,
            diameterTop: this.meshItem.radius,
            diameterBottom: this.meshItem.radius
        }

        this._mesh = MeshBuilder.CreateCylinder(`${this.meshItem.id}-collision-avoidance-mesh`, options, this.worldProvider.scene);
        this._mesh.position.y = meshAttachmentHeight;

        const material = new StandardMaterial(`${this.meshItem.id}-collision-avoidance-material`, this.worldProvider.scene);
        this._mesh.material = material;
        material.diffuseColor = Color3.Blue();
        material.alpha = 0.5;
    }
}
import { InputBlock, Mesh, MeshBuilder, NodeMaterial, Scene } from "babylonjs";
import fowMaterial from "../../../assets/shaders/fow_shader.json";
import { MonoBehaviour } from "../../model/behaviours/MonoBehaviour";
import { MonoBehaviourName } from "../../model/behaviours/MonoBehaviourName";
import { GameObject } from "../../model/objects/game_object/GameObject";

export class FogOfWar extends MonoBehaviour {
    private readonly scene: Scene;
    private readonly width = 200;
    private readonly height = 200;
    private readonly positionY = 10;
    private readonly character: GameObject;
    
    private mesh: Mesh;
    private material: NodeMaterial;

    constructor(scene: Scene, character: GameObject) {
        super(MonoBehaviourName.FOG_OF_WAR);
        this.scene = scene;
        this.character = character;

        this.loadMaterial();
    }

    private async loadMaterial() {
        this.material = new NodeMaterial('fow-material', this.scene);
        this.material.loadFromSerialization(fowMaterial);
        this.mesh = MeshBuilder.CreateGround("ground", {width: this.width, height: this.height}, this.scene);
        this.material = await NodeMaterial.ParseFromSnippetAsync("4750E2#8", this.scene);

        this.mesh.position.y += this.positionY;
        this.mesh.material = this.material;
        (<InputBlock> this.material.getBlockByName('radius')).value = 0.7;
    }

    update() {
        const groundWidth = this.mesh.getBoundingInfo().boundingBox.extendSizeWorld.x;
        const groundHeight = this.mesh.getBoundingInfo().boundingBox.extendSizeWorld.z;
        const groundPos = this.mesh.getAbsolutePosition();

        const circleOffsetX = (this.character.position2D.x - groundPos.x) / groundWidth;
        const circleOffsetZ = (this.character.position2D.y - groundPos.z) / groundHeight;

        (<InputBlock> this.material.getBlockByName('offsetX')).value = circleOffsetX;
        (<InputBlock> this.material.getBlockByName('offsetY')).value = circleOffsetZ;
    }
}
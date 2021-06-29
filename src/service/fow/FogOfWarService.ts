import { InputBlock, Mesh, MeshBuilder, NodeMaterial } from "babylonjs";
import fowMaterial from "../../../assets/shaders/fow_shader.json";
import { GameObject } from "../../model/objects/game_object/GameObject";
import { BaseService } from "../BaseService";
import { SceneService } from "../SceneService";

export class FogOfWarService extends BaseService {
    private readonly width = 200;
    private readonly height = 200;
    private readonly positionY = 10;

    private character: GameObject;
    private mesh: Mesh;
    private material: NodeMaterial;
    private _isEnabled = false;

    constructor(sceneService: SceneService) {
        super(sceneService);
    }

    setCharacter(character: GameObject) {
        this.character = character;
    }

    awake() {
        // this.loadMaterial();
    }

    isEnabled() {
        return this._isEnabled;
    }

    enable() {
        if (!this.isEnabled()) {
            this._isEnabled = true;
            this.loadMaterial();
        }
    }

    disable() {
        if (this.isEnabled()) {
            this._isEnabled = false;
            this.mesh.dispose();
            this.material.dispose();
            this.mesh = undefined;
            this.material = undefined;
        }
    }
    
    private async loadMaterial() {
        this.material = new NodeMaterial('fow-material', this.sceneService.scene);
        this.material.loadFromSerialization(fowMaterial);
        this.mesh = MeshBuilder.CreateGround("ground", {width: this.width, height: this.height}, this.sceneService.scene);
        this.material = await NodeMaterial.ParseFromSnippetAsync("4750E2#8", this.sceneService.scene);

        this.mesh.position.y += this.positionY;
        this.mesh.material = this.material;
        (<InputBlock> this.material.getBlockByName('radius')).value = 0.7;
    }


    update() {
        if (!this.character || !this.mesh) { return; }

        const groundWidth = this.mesh.getBoundingInfo().boundingBox.extendSizeWorld.x;
        const groundHeight = this.mesh.getBoundingInfo().boundingBox.extendSizeWorld.z;
        const groundPos = this.mesh.getAbsolutePosition();

        const circleOffsetX = (this.character.position2D.x - groundPos.x) / groundWidth;
        const circleOffsetZ = (this.character.position2D.y - groundPos.z) / groundHeight;

        (<InputBlock> this.material.getBlockByName('offsetX')).value = circleOffsetX;
        (<InputBlock> this.material.getBlockByName('offsetY')).value = circleOffsetZ;
    }
}
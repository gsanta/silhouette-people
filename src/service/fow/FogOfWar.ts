import { DynamicTexture, Mesh, MeshBuilder, Scene, StandardMaterial, TargetCamera, Vector3 } from "babylonjs";
import { GameObject } from "../../model/objects/game_object/GameObject";

export interface FogOfWarConfig {
    width: number;
    height: number;
    positionY: number;
}

export class FogOfWar {
    private readonly scene: Scene;
    private readonly camera: TargetCamera;
    private readonly target: GameObject;
    private readonly config: FogOfWarConfig;
    private readonly textureResolution = 1024;
    private mesh: Mesh;
    private texture: DynamicTexture;
    private canvasContext: CanvasRenderingContext2D;

    constructor(scene: Scene, camera: TargetCamera, target: GameObject, config: FogOfWarConfig) {
        this.scene = scene;
        this.camera = camera;
        this.target = target;
        this.config = config;
        
        this.createMesh();
    }

    update() {
        this.mesh.position = this.camera.target.clone();
        this.mesh.position.y += this.config.positionY;

        const textureSize = this.texture.getSize();
        const textureContext = this.texture.getContext();

        textureContext.globalCompositeOperation = 'source-over';
        textureContext.clearRect(0,0,this.config.width,this.config.height);
        textureContext.fillStyle = 'rgba( 0, 0, 0, 1 )';
        textureContext.fillRect(0,0,this.config.width,this.config.height);
        textureContext.globalCompositeOperation = 'destination-out';

        const offsets = this.calculatePointC(this.target.position.clone(), this.camera.position.clone(), this.mesh.position.y);
        let x = offsets.x;
        let z = offsets.z;

        var r1 = (this.textureResolution * 0.075);
        var r2 = r1 * 1.1;

        const meshX = this.mesh.position.x;
        const meshY = this.mesh.position.y;
        const w = this.config.width;
        const h = this.config.height;
        const textureW = textureSize.width;
        const textureH = textureSize.height;

        x = (((x + (w / 2)) - meshX) / w) * textureW;
        z = ((((h / 2) - z) + meshY) / h) * textureH;

        var brush = this.canvasContext.createRadialGradient( x, z, r1, x, z, r2 );
            brush.addColorStop(  0, 'rgba( 0, 0, 0,  1 )' );
            brush.addColorStop( .75, 'rgba( 0, 0, 0, .1 )' );
            brush.addColorStop(  1, 'rgba( 0, 0, 0,  0 )' );
        
        textureContext.fillStyle = brush;
        textureContext.fillRect( x - r2, z - r2, r2*2, r2*2 );

        textureContext.save();
        this.texture.update();
    }

    private calculatePointC(pointA: Vector3, pointB: Vector3, height: number){
        var pointC = new Vector3(0, height, 0);
    
        var direction = pointB.subtract( pointA );
        direction.normalize();
    
        pointC.x = pointA.x + (direction.x * pointC.y);
        pointC.z = pointA.z + (direction.z * pointC.y);
    
        return pointC;
    }

    private createMesh() {
        const mesh = MeshBuilder.CreateGround("plane-fow", {width: 1, height: 1, subdivisions: 2 }, this.scene);
        mesh.scaling.x = this.config.width;
        mesh.scaling.z = this.config.height;
        mesh.position = this.camera.target.clone();
        mesh.position.y += this.config.positionY;
        
        this.createMaterial(mesh);
        this.createCanvas();

        this.mesh = mesh;
    }

    private createMaterial(mesh: Mesh) {
        const texture = new DynamicTexture("texture-fow", this.textureResolution, this.scene, true);
        this.texture = texture;

        const material = new StandardMaterial("material-fow", this.scene);
        material.specularColor = new BABYLON.Color3(0, 0, 0);
        material.diffuseTexture = texture;
        material.diffuseTexture.hasAlpha = true;
        material.useAlphaFromDiffuseTexture = true;

        mesh.material = material;
    }

    private createCanvas() {
        const canvas = document.createElement('canvas');
        const textureSize = this.texture.getSize();
        canvas.width = textureSize.width;
        canvas.height = textureSize.height;
        this.canvasContext = canvas.getContext('2d');
    }
}
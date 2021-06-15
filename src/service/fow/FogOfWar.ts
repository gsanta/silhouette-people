import { Color3, DynamicTexture, Mesh, MeshBuilder, Scene, StandardMaterial, TargetCamera, Vector3 } from "babylonjs";
import { GameObject } from "../../model/objects/game_object/GameObject";

export interface FogOfWarConfig {
    width: number;
    height: number;
    positionY: number;
}

class FogOfWarInit {
    private readonly scene: Scene;
    private readonly camera: TargetCamera;
    private readonly resolution: number;
    private readonly config: FogOfWarConfig;

    constructor(scene: Scene, camera: TargetCamera, resolution: number, config: FogOfWarConfig) {
        this.scene = scene;
        this.camera = camera;
        this.resolution = resolution;
        this.config = config;
    }

    init(): [Mesh, DynamicTexture, HTMLCanvasElement] {
        const mesh = this.createMesh();
        const texture = this.createMaterial(mesh);
        const canvas = this.createCanvas(texture);

        return [mesh, texture, canvas];
    }

    private createMesh() {
        const mesh = MeshBuilder.CreateGround("plane-fow", {width: 1, height: 1, subdivisions: 2 }, this.scene);
        // mesh.position = this.camera.target.clone();
        mesh.scaling.x = this.config.width;
        mesh.scaling.z = this.config.height;
        mesh.position.y += this.config.positionY;

        return mesh;
    }

    private createMaterial(mesh: Mesh): DynamicTexture {
        const texture = new DynamicTexture("texture-fow", this.resolution, this.scene, true);

        const material = new StandardMaterial("material-fow", this.scene);
        material.specularColor = new Color3(0, 0, 0);
        material.diffuseTexture = texture;
        material.diffuseTexture.hasAlpha = true;
        material.useAlphaFromDiffuseTexture = true;

        mesh.material = material;

        return texture;
    }

    private createCanvas(texture: DynamicTexture) {
        const canvas = document.createElement('canvas');
        const textureSize = texture.getSize();
        canvas.width = textureSize.width;
        canvas.height = textureSize.height;

        return canvas;
    }
}

export class FogOfWar {
    private readonly resolution = 1024;
    private readonly camera: TargetCamera;
    private readonly target: GameObject;
    private readonly config: FogOfWarConfig;
    private mesh: Mesh;
    private texture: DynamicTexture;
    private canvas: HTMLCanvasElement;

    constructor(scene: Scene, camera: TargetCamera, target: GameObject, config: FogOfWarConfig) {
        this.camera = camera;
        this.target = target;
        this.config = config;
        
        const [mesh, texture, canvas] = new FogOfWarInit(scene, camera, this.resolution, config).init();
        this.mesh = mesh;
        this.texture = texture;
        this.canvas = canvas;
    }

    update() {
        // this.mesh.position = this.camera.target.clone();
        this.mesh.position.x = this.config.width / 4;
        this.mesh.position.z = - this.config.height / 4;
        this.mesh.position.y += this.config.positionY;
        const textureContext = this.texture.getContext();

        this.clearRect();
        this.createVisibleArea();

        textureContext.save();
        this.texture.update();
    }

    private createVisibleArea() {
        const textureSize = this.texture.getSize();
        const textureContext = this.texture.getContext();

        const offsets = this.calculateRelativePosFromOrigin(this.target.position.clone(), this.camera.position.clone(), this.mesh.position.y);
        let x = 0//offsets.x;
        let z = 0//offsets.z;

        var r1 = (this.resolution * 0.075);
        var r2 = r1 * 1.1;

        const meshX = 0// this.mesh.position.x;
        const meshY = 0 //this.mesh.position.y;
        const w = this.config.width;
        const h = this.config.height;
        const textureW = textureSize.width;
        const textureH = textureSize.height;

        x = (((x + (w / 2)) - meshX) / w) * textureW / 2;
        z = ((((h / 2) - z) + meshY) / h) * textureH / 2;

        var brush = this.canvas.getContext("2d").createRadialGradient( x, z, r1, x, z, r2 );
            brush.addColorStop(  0, 'rgba( 0, 0, 0,  1 )' );
            brush.addColorStop( .75, 'rgba( 0, 0, 0, .1 )' );
            brush.addColorStop(  1, 'rgba( 0, 0, 0,  0 )' );
        
        textureContext.fillStyle = brush;
        textureContext.fillRect( x - r2, z - r2, r2*2, r2*2 );
    }

    private clearRect() {
        const textureContext = this.texture.getContext();

        textureContext.globalCompositeOperation = 'source-over';
        textureContext.clearRect(0,0,this.config.width,this.config.height);
        textureContext.fillStyle = 'rgba( 0, 0, 0, 1 )';
        textureContext.fillRect(0,0,this.config.width,this.config.height);
        textureContext.globalCompositeOperation = 'destination-out';
    }

    private calculateRelativePosFromOrigin(pointA: Vector3, pointB: Vector3, height: number){
        var pointC = new Vector3(0, height, 0);
    
        var direction = pointB.subtract( pointA );
        direction.normalize();
    
        pointC.x = pointA.x + (direction.x * pointC.y);
        pointC.z = pointA.z + (direction.z * pointC.y);
    
        return pointC;
    }
}
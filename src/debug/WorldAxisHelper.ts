import { Color3, Mesh, Vector3 } from "babylonjs";
import { World } from "../services/World";

export class WorldAxisHelper {
    private world: World;
    private meshes: Mesh[];

    constructor(world: World) {
        this.world = world;

        // this.world.onReady(() => this.init());
    }

    show(yPos: number) {
        if (!this.meshes) {
            this.createAxis(yPos, 10);
        }
    }

    hide() {
        this.meshes.forEach(mesh => mesh.dispose());
        this.meshes = undefined;
    }

    private createAxis(yPos: number, size: number) {
        const scene = this.world.scene;
        const origin = new Vector3(0, yPos, 0);
        
        this.meshes = [];

        const axisX = Mesh.CreateLines("axisX",
            [ 
                origin,
                origin.add(new Vector3(size, 0, 0)),
                origin.add(new Vector3(size * 0.95, 0.05 * size, 0)), 
                origin.add(new Vector3(size, 0, 0)),
                origin.add(new Vector3(size * 0.95, -0.05 * size, 0))
            ],
            scene
        );
        axisX.color = new Color3(1, 0, 0);
        this.meshes.push(axisX);
        
        const axisY = Mesh.CreateLines("axisY",
            [
                origin,
                origin.add(new Vector3(0, size, 0)),
                origin.add(new Vector3( -0.05 * size, size * 0.95, 0)), 
                origin.add(new Vector3(0, size, 0)),
                origin.add(new Vector3( 0.05 * size, size * 0.95, 0))
            ],
            scene
        );
        axisY.color = new Color3(0, 1, 0);
        this.meshes.push(axisY);
        
        var axisZ = Mesh.CreateLines("axisZ",
            [
                origin,
                origin.add(new Vector3(0, 0, size)),
                origin.add(new Vector3( 0 , -0.05 * size, size * 0.95)),
                origin.add(new Vector3(0, 0, size)),
                origin.add(new Vector3( 0, 0.05 * size, size * 0.95))
            ],
            scene
        );
        axisZ.color = new Color3(0, 0, 1);
        this.meshes.push(axisZ);
    }
}
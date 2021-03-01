import { ArcRotateCamera, Engine, HemisphericLight, MeshBuilder, Scene, SceneLoader, Vector3 } from "babylonjs";
import 'babylonjs-loaders';

export function createGame() {
    const canvas = <HTMLCanvasElement> document.getElementById("game-canvas");
    const engine = new Engine(canvas, true);
    const scene = new Scene(engine);

    MeshBuilder.CreateBox("box", {})

    const camera = new ArcRotateCamera("camera", -Math.PI / 2, Math.PI / 2.5, 15, new Vector3(0, 0, 0), scene);
    camera.attachControl(canvas, true);
    const light = new HemisphericLight("light", new Vector3(1, 1, 0), scene);

    engine.runRenderLoop(function () {
            scene.render();
    });
    
    window.addEventListener("resize", function () {
            engine.resize();
    });

    SceneLoader.ImportMesh('', "./models/", "character.glb", scene, function (meshes, particleSystems, skeletons) {
        // do something with the meshes and skeletons
        // particleSystems are always null for glTF assets
    });

}
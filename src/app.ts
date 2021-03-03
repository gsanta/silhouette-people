import { ArcRotateCamera, Axis, CannonJSPlugin, Engine, HemisphericLight, Mesh, MeshBuilder, PhysicsImpostor, Scene, SceneLoader, Space, Vector3 } from "babylonjs";
import 'babylonjs-loaders';
import { GameObject } from "./model/GameObject";
import { World } from "./model/World";
import * as ReactDOM from 'react-dom';
import React from "react";
import { MainUI } from './ui/MainUI';
import { InputComponent } from "./model/components/InputComponent";
import { PhysicsComponent } from "./model/components/PhyisicsComponent";

export function createGame() {
    const root = <HTMLCanvasElement> document.getElementById("root");
    
    const world = new World();

    ReactDOM.render(
        React.createElement(MainUI, { world: world, onReady: () => initGame(world) }),
        root
    );
}

function initGame(world: World) {
    const canvas = <HTMLCanvasElement> document.getElementById("game-canvas");

    const engine = new Engine(canvas, true);
    const scene = new Scene(engine);
    scene.collisionsEnabled = true;
    scene.enablePhysics(null, new CannonJSPlugin());
    // scene.gravity = new Vector3(0, -0.15, 0);

    const ground = MeshBuilder.CreateBox('ground', {width: 30, height: 0.2, depth: 30});
    ground.physicsImpostor = new PhysicsImpostor(ground, PhysicsImpostor.BoxImpostor, { mass: 0 }, scene);

    const camera = new ArcRotateCamera("camera", -Math.PI / 2, Math.PI / 2.5, 15, new Vector3(0, 0, 0), scene);
    camera.attachControl(canvas, true);
    const light = new HemisphericLight("light", new Vector3(1, 1, 0), scene);

    engine.runRenderLoop(function () {
            scene.render();
            world.gameObjects.forEach(gameObject => gameObject.update(world));
    });
    
    window.addEventListener("resize", function () {
            engine.resize();
    });

    SceneLoader.ImportMesh('', "./models/", "character.glb", scene, function (meshes, particleSystems, skeletons) {
        world.gameObjects.push(new GameObject(meshes[0] as Mesh, new InputComponent(), new PhysicsComponent()));
        meshes[1].physicsImpostor = new PhysicsImpostor(meshes[1], PhysicsImpostor.BoxImpostor, { mass: 1,  }, scene);
        meshes[0].translate(Axis.Y, 0.1, Space.WORLD);
        // do something with the meshes and skeletons
        // particleSystems are always null for glTF assets
    });

    SceneLoader.ImportMesh('', "./models/", "tree.glb", scene, function (meshes, particleSystems, skeletons) {
        const collider = MeshBuilder.CreateBox('collider', { width: 2, depth: 2, height: 80}, scene);
        collider.parent = meshes[1];
        world.gameObjects.push(new GameObject(collider as Mesh, undefined, undefined));
        meshes[1].translate(Axis.X, 5, Space.WORLD);
        // do something with the meshes and skeletons
        // particleSystems are always null for glTF assets
    });
}
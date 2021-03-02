import { ArcRotateCamera, Engine, HemisphericLight, Mesh, MeshBuilder, Scene, SceneLoader, Vector3 } from "babylonjs";
import 'babylonjs-loaders';
import { GameObject } from "./model/GameObject";
import { World } from "./model/World";
import * as ReactDOM from 'react-dom';
import React from "react";
import { MainUI } from './ui/MainUI';

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

    MeshBuilder.CreateGround('ground', {width: 10, height: 10});

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
        world.gameObjects.push(new GameObject(meshes[0] as Mesh));
        // do something with the meshes and skeletons
        // particleSystems are always null for glTF assets
    });
}
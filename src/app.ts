import { ArcRotateCamera, CannonJSPlugin, Color4, Engine, HemisphericLight, MeshBuilder, PhysicsImpostor, Scene, StandardMaterial, Vector2, Vector3 } from "babylonjs";
import 'babylonjs-loaders';
import React from "react";
import * as ReactDOM from 'react-dom';
import { AreaMap } from "./model/area/AreaMap";
import { World } from "./model/World";
import { MainUI } from './ui/MainUI';
import level1 from '../assets/levels/level1.json';

export function createGame() {
    const root = <HTMLCanvasElement> document.getElementById("root");
    
    const world = new World();
    (window as any).world = world;

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
    scene.clearColor = new Color4(0.52, 0.73, 0.4, 1);
    world.setScene(scene);
	// var terrainMaterial = new TerrainMaterial("terrainMaterial", scene);
    // terrainMaterial.specularColor = new BABYLON.Color3(0.5, 0.5, 0.5);
    // terrainMaterial.specularPower = 64;
	// terrainMaterial.mixTexture = new Texture("textures/mixMap.png", scene);
    // terrainMaterial.diffuseTexture1 = new Texture("textures/rock.png", scene);
    // terrainMaterial.diffuseTexture2 = new Texture("textures/rock.png", scene);
    // terrainMaterial.diffuseTexture3 = new Texture("textures/rock.png", scene);

    // var groundWithheightMap = Mesh.CreateGroundFromHeightMap("groundWithheightMap", "assets/textures/heightMap.png", 100, 100, 100, 0, 10, scene, false);
	// groundWithheightMap.position.y = -0.2;
	// groundWithheightMap.material = terrainMaterial;
    world.ai.areaMap = new AreaMap(new Vector2(0, 0), new Vector2(50, -50), 0.5);
    // world.ai.areaMap = new AreaMap(new Vector2(0, 0), new Vector2(10, -10), 0.5);

    // ground.physicsImpostor = new PhysicsImpostor(ground, PhysicsImpostor.BoxImpostor, { mass: 0 }, scene);
    // const groundMaterial = new StandardMaterial('ground-material', scene);
    // // groundMaterial.alpha = 0;
    // // groundMaterial.diffuseColor = Color3.FromHexString('#85BB65');
    // ground.material = groundMaterial;

    const camera = new ArcRotateCamera("camera", Math.PI + Math.PI / 3, Math.PI / 3, 120, new Vector3(0, 0, 0), scene);
    camera.attachControl(canvas, true);

    // var camera = new FollowCamera("FollowCam", new Vector3(0, 20, 0), scene);
    // // The goal distance of camera from target
    // camera.radius = 15;
    // // The goal height of camera above local origin (centre) of target
    // camera.heightOffset = 20;
    // // The goal rotation of camera around local origin (centre) of target in x y plane
    // camera.rotationOffset = Math.PI / 2;
    // // Acceleration of camera in moving from current to goal position
    // camera.cameraAcceleration = 0.05;
    // // The speed at which acceleration is halted
    // camera.maxCameraSpeed = 10;

    world.import.import(level1);

    const light = new HemisphericLight("light", new Vector3(1, 1, 0), scene);

    engine.runRenderLoop(function () {
            scene.render();
            setTimeout(() => {
                world.store.getAll().forEach(gameObject => gameObject.update(world));
            }, 3000)
    });
    
    window.addEventListener("resize", function () {
            engine.resize();
    });

    world.level.loadLevel();
    world.level.onLevelLoaded(() => {
        const player = world.store.getAll().find(gameObject => gameObject.cameraTargetMesh);
        if (player) {                
            // camera.lockedTarget = player.cameraTargetMesh;
        }
    })
}
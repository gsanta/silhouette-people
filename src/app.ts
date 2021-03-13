import { ArcRotateCamera, CannonJSPlugin, Color4, Engine, FollowCamera, HemisphericLight, Mesh, MeshBuilder, PhysicsImpostor, Scene, StandardMaterial, Texture, Vector2, Vector3 } from "babylonjs";
import 'babylonjs-loaders';
import React from "react";
import * as ReactDOM from 'react-dom';
import { AreaMap } from "./controller/ai/AreaMap";
import { debugInfo } from "./model/debugInfo";
import { GameObject } from "./model/GameObject";
import { gameobjects } from "./model/gameobjects";
import { World } from "./model/World";
import { MainUI } from './ui/MainUI';

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

    const ground = MeshBuilder.CreateBox('ground', {width: 100, height: 0.2, depth: 100});
    const groundMin = ground.getBoundingInfo().boundingBox.minimumWorld;
    const groundMax = ground.getBoundingInfo().boundingBox.maximumWorld;
    const extend = ground.getBoundingInfo().boundingBox.extendSizeWorld;
    world.ai.areaMap = new AreaMap(new Vector2(groundMin.x + extend.x, groundMin.z), new Vector2(groundMax.x, groundMax.z - extend.z), 0.5);
    // world.ai.areaMap = new AreaMap(new Vector2(0, 0), new Vector2(5, 5), 0.5);

    ground.physicsImpostor = new PhysicsImpostor(ground, PhysicsImpostor.BoxImpostor, { mass: 0 }, scene);
    const groundMaterial = new StandardMaterial('ground-material', scene);
    groundMaterial.alpha = 0;
    // groundMaterial.diffuseColor = Color3.FromHexString('#85BB65');
    ground.material = groundMaterial;

    const camera = new ArcRotateCamera("camera", -Math.PI / 2, Math.PI / 2, 15, new Vector3(0, 0, 0), scene);
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

    const light = new HemisphericLight("light", new Vector3(1, 1, 0), scene);

    engine.runRenderLoop(function () {
            scene.render();
            world.gameObjects.forEach(gameObject => gameObject.update(world));
    });
    
    window.addEventListener("resize", function () {
            engine.resize();
    });

    const gos: GameObject[] = [];
    const promises: Promise<GameObject>[] = [];

    gameobjects.forEach(gameObject => {
        const p = GameObject.create(gameObject, world);
        promises.push(p);

        p.then((m) => {
            gos.push(m);
            // m.debug(true);
            if (m.cameraTargetMesh) {                
                // camera.lockedTarget = m.cameraTargetMesh;
            }
        })
    });

    Promise.all(promises).then(gos => {
        world.areaMap.fillMeshes(gos.map(go => go.colliderMesh));
        world.areaMap.visualize({ height: 5 }, world);
    });

    world.debug.setWorldAxisVisibility(debugInfo.worldAxis.show, debugInfo.worldAxis.y);

    // SceneLoader.ImportMesh('', "./models/", "character.glb", scene, function (meshes, particleSystems, skeletons) {
    //     world.gameObjects.push(new GameObject(meshes[0] as Mesh, new InputComponent(), new PhysicsComponent()));
    //     meshes[1].physicsImpostor = new PhysicsImpostor(meshes[1], PhysicsImpostor.BoxImpostor, { mass: 1,  }, scene);
    //     meshes[0].translate(Axis.Y, 0.1, Space.WORLD);
    //     // do something with the meshes and skeletons
    //     // particleSystems are always null for glTF assets
    // });

    // SceneLoader.ImportMesh('', "./models/", "tree.glb", scene, function (meshes, particleSystems, skeletons) {
    //     const collider = MeshBuilder.CreateBox('collider', { width: 2, depth: 2, height: 80}, scene);
    //     collider.parent = meshes[1];
    //     world.gameObjects.push(new GameObject(collider as Mesh));
    //     meshes[1].translate(Axis.X, 5, Space.WORLD);
    //     // do something with the meshes and skeletons
    //     // particleSystems are always null for glTF assets
    // });
}
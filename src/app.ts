import { ArcRotateCamera, CannonJSPlugin, Color3, Color4, Engine, FollowCamera, HemisphericLight, Mesh, MeshBuilder, PhysicsImpostor, Scene, SceneLoader, Space, StandardMaterial, Texture, Vector3 } from "babylonjs";
import 'babylonjs-loaders';
import { GameObject } from "./model/GameObject";
import { World } from "./model/World";
import * as ReactDOM from 'react-dom';
import React from "react";
import { MainUI } from './ui/MainUI';
import { InputComponent } from "./model/components/InputComponent";
import { PhysicsComponent } from "./model/components/PhyisicsComponent";
import { gameobjects } from "./model/gameobjects";
import { TerrainMaterial } from "babylonjs-materials";

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
    world.scene = scene;
    scene.collisionsEnabled = true;
    scene.enablePhysics(null, new CannonJSPlugin());
    scene.clearColor = new Color4(0.52, 0.73, 0.4, 1);
    // scene.gravity = new Vector3(0, -0.15, 0);

    

	var terrainMaterial = new TerrainMaterial("terrainMaterial", scene);
    terrainMaterial.specularColor = new BABYLON.Color3(0.5, 0.5, 0.5);
    terrainMaterial.specularPower = 64;
	
	// Set the mix texture (represents the RGB values)
    terrainMaterial.mixTexture = new Texture("textures/mixMap.png", scene);
	
	// Diffuse textures following the RGB values of the mix map
	// diffuseTexture1: Red
	// diffuseTexture2: Green
	// diffuseTexture3: Blue
    terrainMaterial.diffuseTexture1 = new Texture("textures/rock.png", scene);
    terrainMaterial.diffuseTexture2 = new Texture("textures/rock.png", scene);
    terrainMaterial.diffuseTexture3 = new Texture("textures/rock.png", scene);

    var groundWithheightMap = Mesh.CreateGroundFromHeightMap("groundWithheightMap", "assets/textures/heightMap.png", 100, 100, 100, 0, 10, scene, false);
	groundWithheightMap.position.y = -0.2;
	groundWithheightMap.material = terrainMaterial;
    
    const ground = MeshBuilder.CreateBox('ground', {width: 100, height: 0.2, depth: 100});

    ground.physicsImpostor = new PhysicsImpostor(ground, PhysicsImpostor.BoxImpostor, { mass: 0 }, scene);
    const groundMaterial = new StandardMaterial('ground-material', scene);
    groundMaterial.alpha = 0;
    // groundMaterial.diffuseColor = Color3.FromHexString('#85BB65');
    ground.material = groundMaterial;

    // const camera = new ArcRotateCamera("camera", -Math.PI / 2, Math.PI / 2.5, 15, new Vector3(0, 0, 0), scene);
    // camera.attachControl(canvas, true);

    var camera = new FollowCamera("FollowCam", new Vector3(0, 20, 0), scene);
    // The goal distance of camera from target
    camera.radius = 15;
    // The goal height of camera above local origin (centre) of target
    camera.heightOffset = 20;
    // The goal rotation of camera around local origin (centre) of target in x y plane
    camera.rotationOffset = Math.PI / 2;
    // Acceleration of camera in moving from current to goal position
    camera.cameraAcceleration = 0.05;
    // The speed at which acceleration is halted
    camera.maxCameraSpeed = 10;

    const light = new HemisphericLight("light", new Vector3(1, 1, 0), scene);

    engine.runRenderLoop(function () {
            scene.render();
            world.gameObjects.forEach(gameObject => gameObject.update(world));
    });
    
    window.addEventListener("resize", function () {
            engine.resize();
    });

    gameobjects.forEach(gameObject => {
        GameObject.create(gameObject, world)
        .then((m) => {
            // m.debug(true);
            if (m.cameraTargetMesh) {                
                camera.lockedTarget = m.cameraTargetMesh;
            }
        })
    });

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
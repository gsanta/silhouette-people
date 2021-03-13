import { Axis, ISceneLoaderAsyncResult, Mesh, MeshBuilder, PhysicsImpostor, SceneLoader, Space, StandardMaterial } from "babylonjs";
import { AbstractCharacterState } from "./character/AbstractCharacterState";
import { IdleCharacterState } from "./character/IdleCharacterState";
import { InputComponent } from "./components/InputComponent";
import { PhysicsComponent } from "./components/PhyisicsComponent";
import { GameObject, GameObjectJson, GameObjectRole } from "./GameObject";
import { World } from "./World";
import { SearchingEnemyState } from "../controller/ai/SearchingEnemyState";


export class GameObjectFactory {

    static async create(json: GameObjectJson, world: World): Promise<GameObject> {
        const result = await SceneLoader.ImportMeshAsync('', "./models/", json.modelPath, world.scene);

        switch(json.role) {
            case GameObjectRole.Player:
                return await this.createPlayer(result, json, world);
            case GameObjectRole.Enemy:
                return await this.createEnemy(result, json, world);
            case GameObjectRole.Static:
                return await this.createStatic(result, json, world);
        }
    }

    private static createPlayer(importedMeshes: ISceneLoaderAsyncResult, json: GameObjectJson, world: World): GameObject {
        importedMeshes.animationGroups.forEach(animationGroup => animationGroup.stop());

        const mainMesh = <Mesh> importedMeshes.meshes[0];
        mainMesh.name = json.id;
        
        let state: AbstractCharacterState = new IdleCharacterState();

        const gameObject = new GameObject(mainMesh, state);
        gameObject.role = json.role;
        gameObject.skeleton = importedMeshes.skeletons.length > 0 ? importedMeshes.skeletons[0] : undefined;
        gameObject.animationGroups = importedMeshes.animationGroups;

        if (json.collider) {
            this.applyCollider(gameObject, json, world);
        }

        if (json.input) {
            this.applyInput(gameObject, json, world);
        }

        if (json.cameraTarget) {
            this.applyCameraTarget(gameObject, json, world);
        }

        if (json.physics) {
            this.applyPhysics(gameObject, json, world);
        }

        world.gameObjects.push(gameObject);

        return gameObject;
    }

    private static createEnemy(importedMeshes: ISceneLoaderAsyncResult, json: GameObjectJson, world: World): GameObject {
        importedMeshes.animationGroups.forEach(animationGroup => animationGroup.stop());

        const mainMesh = <Mesh> importedMeshes.meshes[0];
        mainMesh.name = json.id;
        
        let state: AbstractCharacterState = new SearchingEnemyState(world);

        const gameObject = new GameObject(mainMesh, state);
        gameObject.role = json.role;
        gameObject.skeleton = importedMeshes.skeletons.length > 0 ? importedMeshes.skeletons[0] : undefined;
        gameObject.animationGroups = importedMeshes.animationGroups;

        if (json.collider) {
            this.applyCollider(gameObject, json, world);
        }

        if (json.physics) {
            this.applyPhysics(gameObject, json, world);
        }

        world.gameObjects.push(gameObject);

        return gameObject;
    }

    private static createStatic(importedMeshes: ISceneLoaderAsyncResult, json: GameObjectJson, world: World): GameObject {
        importedMeshes.animationGroups.forEach(animationGroup => animationGroup.stop());

        const mainMesh = <Mesh> importedMeshes.meshes[1];
        mainMesh.name = json.id;
        
        let state: AbstractCharacterState;

        const gameObject = new GameObject(mainMesh, state);
        gameObject.role = json.role;
        gameObject.skeleton = importedMeshes.skeletons.length > 0 ? importedMeshes.skeletons[0] : undefined;
        gameObject.animationGroups = importedMeshes.animationGroups;

        if (json.collider) {
            this.applyCollider(gameObject, json, world);
        }

        if (json.physics) {
            this.applyPhysics(gameObject, json, world);
        }

        world.gameObjects.push(gameObject);

        return gameObject;
    }

    private static applyCollider(gameObject: GameObject, json: GameObjectJson, world: World) {
        const dimensions = json.collider.dimensions;
        const [width, depth, height] = [dimensions.x, dimensions.z, dimensions.y];
        const collider = MeshBuilder.CreateBox(`${json.id}-collider`, { width, depth, height}, world.scene);
        collider.checkCollisions = true;
        gameObject.mesh.parent = collider;
        gameObject.mesh.translate(Axis.Y, -dimensions.y / 2, Space.LOCAL);
        collider.setAbsolutePosition(json.position);
        const colliderMaterial = new StandardMaterial(`${json.id}-collider-material`, world.scene);
        colliderMaterial.alpha = 0;
        collider.material = colliderMaterial;
        gameObject.colliderMesh = collider;
    }

    private static applyPhysics(gameObject: GameObject, json: GameObjectJson, world: World) {
        gameObject.colliderMesh.physicsImpostor = new PhysicsImpostor(gameObject.colliderMesh, PhysicsImpostor.BoxImpostor, { mass: 1,  }, world.scene);
    }

    private static applyInput(gameObject: GameObject, json: GameObjectJson, world: World) {
        gameObject.physicsComponent = new PhysicsComponent();
        gameObject.inputComponent = new InputComponent();  
    }

    private static applyCameraTarget(gameObject: GameObject, json: GameObjectJson, world: World) {
        const cameraTarget = MeshBuilder.CreateBox(`${json.id}-camera-target`, { width: 0.5, depth: 0.5, height: 0.5}, world.scene);
        gameObject.cameraTargetMesh = cameraTarget;
        cameraTarget.parent = gameObject.colliderMesh;
        cameraTarget.isVisible = false;
    }
}
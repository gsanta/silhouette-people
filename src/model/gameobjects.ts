import { Vector3 } from "babylonjs";
import { GameObjectJson, GameObjectType } from "./GameObject";

export const gameobjects: GameObjectJson[] = [
    {
        id: 'character',
        type: GameObjectType.Character,
        modelPath: 'character.glb',
        position: new Vector3(5, 3, 5),
        input: true,
        physics: true,
        collider: {
            dimensions: new Vector3(1, 3.5, 1),
        },
        cameraTarget: {
            relativPos: new Vector3(0, 2, 0)
        }
    },
    {
        id: 'tree',
        type: GameObjectType.Static,
        modelPath: 'tree.glb',
        position: new Vector3(0, 5, 0),
        input: false,
        physics: false,
        collider: {
            dimensions: new Vector3(0.5, 10, 0.5)
        }
    },
    {
        id: 'tree2',
        type: GameObjectType.Static,
        modelPath: 'tree2.glb',
        position: new Vector3(3, 5, 3),
        input: false,
        physics: false,
        collider: {
            dimensions: new Vector3(0.5, 10, 0.5)
        }
    },
    {
        id: 'tree3',
        type: GameObjectType.Static,
        modelPath: 'tree3.glb',
        position: new Vector3(-3, 5, 3),
        input: false,
        physics: false,
        collider: {
            dimensions: new Vector3(0.5, 10, 0.5)
        }
    }
]
import { Vector3 } from "babylonjs";
import { GameObjectJson, GameObjectRole } from "./GameObject";

export const gameobjects: GameObjectJson[] = [
    // {
    //     id: 'character',
    //     role: GameObjectRole.Player,
    //     modelPath: 'character.glb',
    //     position: new Vector3(35, 3, -5),
    //     input: true,
    //     physics: true,
    //     collider: {
    //         dimensions: new Vector3(1, 3.5, 1),
    //     },
    //     cameraTarget: {
    //         relativPos: new Vector3(0, 2, 0)
    //     }
    // },
    {
        id: 'enemy',
        role: GameObjectRole.Enemy,
        modelPath: 'character.glb',
        position: new Vector3(0, 3, -5),
        input: false,
        physics: false,
        collider: {
            dimensions: new Vector3(1, 3.5, 1),
        },
        cameraTarget: {
            relativPos: new Vector3(0, 2, 0)
        }
    },
    {
        id: 'tree',
        role: GameObjectRole.Static,
        modelPath: 'tree.glb',
        position: new Vector3(30, 5, -10),
        input: false,
        physics: false,
        collider: {
            dimensions: new Vector3(0.5, 10, 0.5)
        }
    },
    {
        id: 'tree2',
        role: GameObjectRole.Static,
        modelPath: 'tree2.glb',
        position: new Vector3(33, 5, -7),
        input: false,
        physics: false,
        collider: {
            dimensions: new Vector3(0.5, 10, 0.5)
        }
    },
    {
        id: 'tree3',
        role: GameObjectRole.Static,
        modelPath: 'tree3.glb',
        position: new Vector3(27, 5, -7),
        input: false,
        physics: false,
        collider: {
            dimensions: new Vector3(0.5, 10, 0.5)
        }
    },
    {
        id: 'tree4',
        role: GameObjectRole.Static,
        modelPath: 'tree4.glb',
        position: new Vector3(25, 2.5, -4),
        input: false,
        physics: false,
        collider: {
            dimensions: new Vector3(0.3, 5, 0.3)
        }
    },
    {
        id: 'tree5',
        role: GameObjectRole.Static,
        modelPath: 'tree4.glb',
        position: new Vector3(23, 2.5, -2),
        input: false,
        physics: false,
        collider: {
            dimensions: new Vector3(0.3, 5, 0.3)
        }
    },
    {
        id: 'tree6',
        role: GameObjectRole.Static,
        modelPath: 'tree4.glb',
        position: new Vector3(26, 2.5, -1.5),
        input: false,
        physics: false,
        collider: {
            dimensions: new Vector3(0.3, 5, 0.3)
        }
    },
    {
        id: 'tree7',
        role: GameObjectRole.Static,
        modelPath: 'tree4.glb',
        position: new Vector3(25.5, 2.5, -10),
        input: false,
        physics: false,
        collider: {
            dimensions: new Vector3(0.3, 5, 0.3)
        }
    },
    {
        id: 'tree8',
        role: GameObjectRole.Static,
        modelPath: 'tree4.glb',
        position: new Vector3(32, 2.5, -9),
        input: false,
        physics: false,
        collider: {
            dimensions: new Vector3(0.3, 5, 0.3)
        }
    },
    {
        id: 'tree9',
        role: GameObjectRole.Static,
        modelPath: 'tree4.glb',
        position: new Vector3(34, 2.5, -10),
        input: false,
        physics: false,
        collider: {
            dimensions: new Vector3(0.3, 5, 0.3)
        }
    },
    {
        id: 'tree10',
        role: GameObjectRole.Static,
        modelPath: 'tree4.glb',
        position: new Vector3(35, 2.5, -8.5),
        input: false,
        physics: false,
        collider: {
            dimensions: new Vector3(0.3, 5, 0.3)
        }
    },
    {
        id: 'tree11',
        role: GameObjectRole.Static,
        modelPath: 'tree4.glb',
        position: new Vector3(35.5, 2.5, -6),
        input: false,
        physics: false,
        collider: {
            dimensions: new Vector3(0.3, 5, 0.3)
        }
    },
    {
        id: 'tree12',
        role: GameObjectRole.Static,
        modelPath: 'tree4.glb',
        position: new Vector3(33, 2.5, -4.5),
        input: false,
        physics: false,
        collider: {
            dimensions: new Vector3(0.3, 5, 0.3)
        }
    },
    {
        id: 'tree13',
        role: GameObjectRole.Static,
        modelPath: 'tree4.glb',
        position: new Vector3(32, 2.5, -4),
        input: false,
        physics: false,
        collider: {
            dimensions: new Vector3(0.3, 5, 0.3)
        }
    },
    {
        id: 'tree14',
        role: GameObjectRole.Static,
        modelPath: 'tree4.glb',
        position: new Vector3(30, 2.5, -2.5),
        input: false,
        physics: false,
        collider: {
            dimensions: new Vector3(0.3, 5, 0.3)
        }
    }
]
import { Vector3 } from "babylonjs";
import { GameObjectJson, GameObjectRole } from "./game_object/GameObject";

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
        position: new Vector3(0, 0, -5),
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
        id: 'tree_temp',
        role: GameObjectRole.Static,
        modelPath: 'tree1.glb',
        position: new Vector3(5, 0, -5),
        input: false,
        physics: false,
        collider: {
            dimensions: new Vector3(0.5, 5, 0.5)
        }
    },
    {
        id: 'tree_temp2',
        role: GameObjectRole.Static,
        modelPath: 'tree1.glb',
        position: new Vector3(3, 0, -7),
        input: false,
        physics: false,
        collider: {
            dimensions: new Vector3(0.5, 5, 0.5)
        }
    },
    {
        id: 'tree_temp3',
        role: GameObjectRole.Static,
        modelPath: 'tree4.glb',
        position: new Vector3(6, 0, -4),
        input: false,
        physics: false,
        collider: {
            dimensions: new Vector3(0.5, 5, 0.5)
        }
    },
    {
        id: 'tree_temp4',
        role: GameObjectRole.Static,
        modelPath: 'tree1.glb',
        position: new Vector3(5, 0, -6),
        input: false,
        physics: false,
        collider: {
            dimensions: new Vector3(0.5, 5, 0.5)
        }
    },
    {
        id: 'tree',
        role: GameObjectRole.Static,
        modelPath: 'tree1.glb',
        position: new Vector3(30, 0, -10),
        input: false,
        physics: false,
        collider: {
            dimensions: new Vector3(0.5, 5, 0.5)
        }
    },
    {
        id: 'tree2',
        role: GameObjectRole.Static,
        modelPath: 'tree1.glb',
        position: new Vector3(33, 0, -7),
        input: false,
        physics: false,
        collider: {
            dimensions: new Vector3(0.5, 5, 0.5)
        }
    },
    {
        id: 'tree3',
        role: GameObjectRole.Static,
        modelPath: 'tree1.glb',
        position: new Vector3(27, 0, -7),
        input: false,
        physics: false,
        collider: {
            dimensions: new Vector3(0.5, 5, 0.5)
        }
    },
    {
        id: 'tree4',
        role: GameObjectRole.Static,
        modelPath: 'tree4.glb',
        position: new Vector3(25, 0, -4),
        input: false,
        physics: false,
        collider: {
            dimensions: new Vector3(0.3, 5, 0.3)
        }
    },
    {
        id: 'tree5',
        role: GameObjectRole.Static,
        modelPath: 'tree1.glb',
        position: new Vector3(23, 0, -2),
        input: false,
        physics: false,
        collider: {
            dimensions: new Vector3(0.3, 5, 0.3)
        }
    },
    {
        id: 'tree6',
        role: GameObjectRole.Static,
        modelPath: 'tree1.glb',
        position: new Vector3(26, 0, -1.5),
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
        position: new Vector3(25.5, 0, -10),
        input: false,
        physics: false,
        collider: {
            dimensions: new Vector3(0.3, 5, 0.3)
        }
    },
    {
        id: 'tree8',
        role: GameObjectRole.Static,
        modelPath: 'tree1.glb',
        position: new Vector3(32, 0, -9),
        input: false,
        physics: false,
        collider: {
            dimensions: new Vector3(0.3, 5, 0.3)
        }
    },
    {
        id: 'tree9',
        role: GameObjectRole.Static,
        modelPath: 'tree1.glb',
        position: new Vector3(34, 0, -10),
        input: false,
        physics: false,
        collider: {
            dimensions: new Vector3(0.3, 5, 0.3)
        }
    },
    {
        id: 'tree10',
        role: GameObjectRole.Static,
        modelPath: 'tree1.glb',
        position: new Vector3(35, 0, -8.5),
        input: false,
        physics: false,
        collider: {
            dimensions: new Vector3(0.3, 5, 0.3)
        }
    },
    {
        id: 'tree11',
        role: GameObjectRole.Static,
        modelPath: 'tree1.glb',
        position: new Vector3(35.5, 0, -6),
        input: false,
        physics: false,
        collider: {
            dimensions: new Vector3(0.3, 5, 0.3)
        }
    },
    {
        id: 'tree12',
        role: GameObjectRole.Static,
        modelPath: 'tree3.glb',
        position: new Vector3(33, 0, -4.5),
        input: false,
        physics: false,
        collider: {
            dimensions: new Vector3(0.3, 5, 0.3)
        }
    },
    {
        id: 'tree13',
        role: GameObjectRole.Static,
        modelPath: 'tree2.glb',
        position: new Vector3(32, 0, -4),
        input: false,
        physics: false,
        collider: {
            dimensions: new Vector3(0.3, 5, 0.3)
        }
    },
    {
        id: 'tree14',
        role: GameObjectRole.Static,
        modelPath: 'tree1.glb',
        position: new Vector3(30, 0, -2.5),
        input: false,
        physics: false,
        collider: {
            dimensions: new Vector3(0.3, 5, 0.3)
        }
    },

    {
        id: 'tree15',
        role: GameObjectRole.Static,
        modelPath: 'tree5.glb',
        position: new Vector3(40, 0, -42),
        input: false,
        physics: false,
        collider: {
            dimensions: new Vector3(0.3, 5, 0.3)
        }
    },
    {
        id: 'tree15',
        role: GameObjectRole.Static,
        modelPath: 'tree6.glb',
        position: new Vector3(37, 0, -41),
        input: false,
        physics: false,
        collider: {
            dimensions: new Vector3(0.3, 5, 0.3)
        }
    },
    {
        id: 'tree15',
        role: GameObjectRole.Static,
        modelPath: 'tree5.glb',
        position: new Vector3(32, 0, -38),
        input: false,
        physics: false,
        collider: {
            dimensions: new Vector3(0.3, 5, 0.3)
        }
    },
    {
        id: 'tree15',
        role: GameObjectRole.Static,
        modelPath: 'tree5.glb',
        position: new Vector3(38, 0, -44),
        input: false,
        physics: false,
        collider: {
            dimensions: new Vector3(0.3, 5, 0.3)
        }
    },

    {
        id: 'house1',
        role: GameObjectRole.Static,
        modelPath: 'house1.glb',
        rotation: Math.PI / 2,
        texturePath: 'texture694.jpg',
        position: new Vector3(-35, 0, -35),
        input: false,
        physics: false,
        collider: {
            dimensions: new Vector3(0.3, 5, 0.3)
        }
    }
]
import { Axis, Quaternion, Vector3 } from "babylonjs";
import { CharacterObj } from "../../model/object/character/CharacterObj";
import { MeshConfig, MeshObjType } from "../../model/object/mesh/MeshObj";
import { MeshFactory } from "../object/mesh/MeshFactory";
import { WorldProvider } from "../object/world/WorldProvider";


export class CitizenFactory {
    private index = 1;

    private readonly meshFactory: MeshFactory;
    private readonly worldProvider: WorldProvider;

    constructor(meshFactory: MeshFactory, worldProvider: WorldProvider) {
        this.meshFactory = meshFactory;
        this.worldProvider = worldProvider;
    }

    async create(): Promise<CharacterObj> {
        const character = await this.meshFactory.create(this.createConfig());

        return <CharacterObj> character;
    }

    private createConfig(): MeshConfig {
        return {
            id: `${this.index++}`,
            ch: 'P',
            type: MeshObjType.Player,
            props: [
                "Model character 0 CanUserOrigInstance=False",
                "Collider 1:3.5:1",
                "Physics 1",
                "State CharacterIdleState",
                `Id citizen-${this.index++}`,
                "Walker CharacterWalker"
            ]
        }
    }
}
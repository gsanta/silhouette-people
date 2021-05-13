import { Axis, Quaternion, Vector3 } from "babylonjs";
import { CharacterItem } from "../../model/item/character/CharacterItem";
import { MeshConfig, MeshObjType } from "../../model/item/mesh/MeshItem";
import { MeshFactory } from "../object/mesh/MeshFactory";
import { WorldProvider } from "../WorldProvider";


export class CitizenFactory {
    private index = 1;

    private readonly meshFactory: MeshFactory;
    private readonly worldProvider: WorldProvider;

    constructor(meshFactory: MeshFactory, worldProvider: WorldProvider) {
        this.meshFactory = meshFactory;
        this.worldProvider = worldProvider;
    }

    async create(): Promise<CharacterItem> {
        const character = await this.meshFactory.createFromConfig(this.createConfig());

        return <CharacterItem> character;
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
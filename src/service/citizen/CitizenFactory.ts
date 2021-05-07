import { CharacterObj } from "../../model/object/character/CharacterObj";
import { GameObjectJson, MeshObjType } from "../../model/object/mesh/MeshObj";
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
        const character = await this.meshFactory.create(this.createConfig(), this.worldProvider.world);

        return <CharacterObj> character;
    }

    private createConfig(): GameObjectJson {
        return {
            id: `${this.index++}`,
            ch: 'P',
            type: MeshObjType.Player,
            features: [
                "Model character 0",
                "Position 20:0:0",
                "Physics 1",
                "Tag Player",
                "State CharacterIdleState",
                `Id citizen-${this.index++}`,
                "Walker CharacterWalker"
            ]
        }
    }
}
import { GameObjectConfig } from "../../model/objects/game_object/GameObject";
import { GameObjectStore } from "../../store/GameObjectStore";
import { MeshFactory } from "../object/mesh/MeshFactory";
import { SceneParser } from "./map/SceneParser";
import { MeshConfigParser } from "./MeshConfigParser";
import { WorldMap } from "./WorldMap";


export class GameObjectImporter {

    private readonly meshConfigParser: MeshConfigParser;
    private readonly meshFactory: MeshFactory;
    private readonly gameObjectStore: GameObjectStore;

    constructor(meshFactory: MeshFactory, gameObjectStore: GameObjectStore) {
        this.meshConfigParser = new MeshConfigParser(new SceneParser());
        this.meshFactory = meshFactory;
        this.gameObjectStore = gameObjectStore;
    }

    async import(gameObjectConfigs: GameObjectConfig[], worldJson: WorldMap) {
        let meshConfigs = this.meshConfigParser.parse(worldJson);
        meshConfigs = [...meshConfigs, ...gameObjectConfigs];

        
        for (const config of meshConfigs) {
            const gameObject = await this.meshFactory.createFromConfig(config);
            this.gameObjectStore.addItem(gameObject);
        }
    }
}
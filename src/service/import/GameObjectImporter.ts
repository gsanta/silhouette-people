import { GameObjectConfig } from "../../model/objects/game_object/GameObject";
import { GameObjectStore } from "../../store/GameObjectStore";
import { GameObjectFactory } from "../object/mesh/GameObjectFactory";
import { SceneParser } from "./map/SceneParser";
import { MeshConfigParser } from "./MeshConfigParser";
import { WorldMap } from "./WorldMap";


export class GameObjectImporter {

    private readonly meshConfigParser: MeshConfigParser;
    private readonly meshFactory: GameObjectFactory;
    private readonly gameObjectStore: GameObjectStore;

    constructor(meshFactory: GameObjectFactory, gameObjectStore: GameObjectStore) {
        this.meshConfigParser = new MeshConfigParser(new SceneParser());
        this.meshFactory = meshFactory;
        this.gameObjectStore = gameObjectStore;
    }

    async import(gameObjectConfigs: GameObjectConfig[], worldJson: WorldMap) {
        const additionalGameObjectConfigs = this.meshConfigParser.parse(worldJson);
        gameObjectConfigs = [...gameObjectConfigs, ...additionalGameObjectConfigs];

        
        for (const config of gameObjectConfigs) {
            const gameObject = await this.meshFactory.createFromConfig(config);
            this.gameObjectStore.addItem(gameObject);
        }
    }
}
import { AssetContainerStore } from "../../store/AssetContainerStore";
import { GameObjectStore } from "../../store/GameObjectStore";
import { RouteStore } from "../../store/RouteStore";
import { ActivePlayerService } from "../ActivePlayerService";
import { ActivePlayerPropertyParser } from "../import/parsers/ActivePlayerPropertyParser";
import { SceneImporter } from "../import/SceneImporter";
import { KeyboardService } from "../input/KeyboardService";
import { ISetup } from "../setup/ISetup";
import { GraphService } from "../graph/GraphService";
import { SceneService } from "../SceneService";
import { GameObjectFactory } from "./mesh/GameObjectFactory";
import { WorldFactory } from "./WorldFactory";
import { CollisionCreator } from "../import/parsers/CollisionCreator";
import { HiddenPropertyParser } from "../import/parsers/HiddenPropertyParser";
import { IdPropertyParser } from "../import/parsers/IdPropertyParser";
import { InputManagerPropertyParser } from "../import/parsers/InputManagerPropertyParser";
import { ModelPropertyParser } from "../import/parsers/ModelPropertyParser";
import { PhysicsPropertyParser } from "../import/parsers/PhysicsPropertyParser";
import { PositionPropertyParser } from "../import/parsers/PositionPropertyParser";
import { RotatePropertyParser } from "../import/parsers/RotatePropertyParser";
import { RoutePropertyParser } from "../import/parsers/RoutePropertyParser";
import { StatePropertyParser } from "../import/parsers/StatePropertyParser";
import { TagPropertyParser } from "../import/parsers/TagPropertyParser";
import { TexturePropertyParser } from "../import/parsers/TexturePropertyParser";
import { WalkerPropertyParser } from "../import/parsers/WalkerPropertyParser";
import { QuarterStore } from "../../store/QuarterStore";
import { MaterialStore } from "../../store/MaterialStore";
import { RouteMapImporter } from "../import/RouteMapImporter";
import { PlayerSetup } from "../player/PlayerSetup";
import { GameObjectImporter } from "../import/GameObjectImporter";
import { RouteImporter } from "../import/RouteImporter";

export class WorldSetup implements ISetup {
    private readonly worldProvider: SceneService;
    private readonly assetContainerStore: AssetContainerStore;
    private readonly keyboardService: KeyboardService;
    private readonly activePlayerService: ActivePlayerService;
    private readonly meshFactory: GameObjectFactory;
    private readonly routeStore: RouteStore;
    private readonly graphService: GraphService;
    private readonly gameObjectStore: GameObjectStore;
    private readonly worldImporter: SceneImporter;
    private readonly worldFactory: WorldFactory;
    private readonly playerSetup: PlayerSetup;

    constructor(
        worldProvider: SceneService,
        assetContainerStore: AssetContainerStore,
        keyboardService: KeyboardService,
        activePlayerService: ActivePlayerService,
        meshFactory: GameObjectFactory,
        routeStore: RouteStore,
        graphService: GraphService,
        gameObjectStore: GameObjectStore,
        quarterStore: QuarterStore,
        materialStore: MaterialStore,
        playerSetup: PlayerSetup
    ) {
        this.gameObjectStore = gameObjectStore;

        this.worldProvider = worldProvider;
        this.assetContainerStore = assetContainerStore;
        this.keyboardService = keyboardService;
        this.activePlayerService = activePlayerService;
        this.meshFactory = meshFactory;
        this.routeStore = routeStore;
        this.graphService = graphService;
        this.playerSetup = playerSetup;

        this.worldFactory = new WorldFactory(this.worldProvider, quarterStore, materialStore);
        this.worldImporter = new SceneImporter(
            this.worldProvider,
            this.worldFactory,
            new GameObjectImporter(this.meshFactory, this.gameObjectStore),
            new RouteMapImporter(this.graphService),
            new RouteImporter(this.routeStore)
        );
    }

    async setup(): Promise<void> {
        this.meshFactory.setPropertyParsers(this.setupPropertyParsers());

        await this.worldImporter.parse();
        await this.playerSetup.setup();
    }

    private setupPropertyParsers() {
        return [
            new ModelPropertyParser(this.worldProvider, this.assetContainerStore),
            new TexturePropertyParser(this.worldProvider),
            new PositionPropertyParser(),  
            new CollisionCreator(this.worldProvider),
            new PhysicsPropertyParser(this.worldProvider),
            new StatePropertyParser(),
            new WalkerPropertyParser(),
            new InputManagerPropertyParser(this.keyboardService, this.graphService),
            new TagPropertyParser(),
            new HiddenPropertyParser(),
            new RotatePropertyParser(),
            new IdPropertyParser(),
            new ActivePlayerPropertyParser(this.activePlayerService),
            new RoutePropertyParser(this.routeStore)
        ]
    }
}
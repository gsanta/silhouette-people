import { AssetContainerStore } from "../../store/AssetContainerStore";
import { GameObjectStore } from "../../store/GameObjectStore";
import { RouteStore } from "../../store/RouteStore";
import { ActivePlayerService } from "../ActivePlayerService";
import { ActivePlayerPropertyParser } from "../import/parsers/ActivePlayerPropertyParser";
import { SceneImporter } from "../import/SceneImporter";
import { KeyboardService } from "../input/KeyboardService";
import { ISetup } from "../setup/ISetup";
import { GraphService } from "../graph/GraphService";
import { StoryTracker } from "../story/StoryTracker";
import { WorldProvider } from "../WorldProvider";
import { MeshFactory } from "./mesh/MeshFactory";
import { MeshItemLoader } from "./mesh/MeshItemLoader";
import { WorldFactory } from "./WorldFactory";
import { CollisionPropertyParser } from "../import/parsers/CollisionPropertyParser";
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

export class WorldSetup implements ISetup {
    private readonly worldProvider: WorldProvider;
    private readonly assetContainerStore: AssetContainerStore;
    private readonly keyboardService: KeyboardService;
    private readonly activePlayerService: ActivePlayerService;
    private readonly meshFactory: MeshFactory;
    private readonly routeStore: RouteStore;
    private readonly graphService: GraphService;
    private readonly storyTracker: StoryTracker;
    private readonly gameObjectStore: GameObjectStore;
    private readonly worldImporter: SceneImporter;
    private readonly worldFactory: WorldFactory;

    constructor(
        worldProvider: WorldProvider,
        assetContainerStore: AssetContainerStore,
        keyboardService: KeyboardService,
        activePlayerService: ActivePlayerService,
        meshFactory: MeshFactory,
        routeStore: RouteStore,
        graphService: GraphService,
        storyTracker: StoryTracker,
        gameObjectStore: GameObjectStore,
        quarterStore: QuarterStore,
        materialStore: MaterialStore
    ) {
        this.storyTracker = storyTracker;
        this.gameObjectStore = gameObjectStore;

        this.worldProvider = worldProvider;
        this.assetContainerStore = assetContainerStore;
        this.keyboardService = keyboardService;
        this.activePlayerService = activePlayerService;
        this.meshFactory = meshFactory;
        this.routeStore = routeStore;
        this.graphService = graphService;

        this.worldImporter = new SceneImporter(this.worldProvider, this.storyTracker);
        this.worldFactory = new WorldFactory(this.worldProvider, quarterStore, materialStore);
    }

    async setup(): Promise<void> {
        this.meshFactory.setPropertyParsers(this.setupPropertyParsers());

        await this.worldImporter.parse();

        const meshItemLoader = new MeshItemLoader(this.storyTracker, this.gameObjectStore, this.meshFactory);
        this.storyTracker.processor.registerLoader(meshItemLoader);

        this.worldProvider.world = await this.worldFactory.createWorldObj(this.worldProvider.scene);

        await this.storyTracker.processor.process();
    }

    private setupPropertyParsers() {
        return [
            new ModelPropertyParser(this.worldProvider, this.assetContainerStore),
            new TexturePropertyParser(this.worldProvider),
            new PositionPropertyParser(),  
            new CollisionPropertyParser(this.worldProvider),
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
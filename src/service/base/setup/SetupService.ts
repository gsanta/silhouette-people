import { Scene } from "babylonjs";
import { InjectProperty } from "../../../di/diDecorators";
import { RouteStore } from "../../../store/RouteStore";
import { CitizenSetup } from "../../citizen/CitizenSetup";
import { lookup } from "../../Lookup";
import { FactorySetup } from "../../object/mesh/FactorySetup";
import { RouteFactory } from "../../routing/route/RouteFactory";
import { WorldFactory } from "../../object/world/WorldFactory";
import { WorldImporter } from "../import/WorldImporter";
import { WorldProvider } from "../../WorldProvider";
import { PlayerStore } from "../../player/PlayerStore";
import { StorySetup } from "../../story/StorySetup";
import { StoryTracker } from "../../story/StoryTracker";
import { RenderGuiService } from "../../ui/RenderGuiService";
import { DebugPanel } from "../debug/DebugPanel";
import { DebugService } from "../debug/DebugService";
import { KeyboardService } from "../keyboard/KeyboardService";
import { PointerService } from "../pointer/PointerService";
import { RouteSetup } from "../../routing/route/RouteSetup";
import { GraphService } from "../../graph/GraphService";
import { PlayerSetup } from "../../player/PlayerSetup";
import { ActivePlayerService } from "../../ActivePlayerService";
import { CameraSetup } from "../../camera/CameraSetup";
import { QuarterStore } from "../../../store/QuarterStore";
import { CameraService } from "../../camera/CameraService";

export class SetupService {

    @InjectProperty("WorldProvider")
    private worldProvider: WorldProvider;

    @InjectProperty("DebugService")
    private debugService: DebugService;

    @InjectProperty("PointerService")
    private pointerService: PointerService;

    @InjectProperty("PlayerStore")
    private playerStore: PlayerStore;

    @InjectProperty("KeyboardService")
    private keyboardService: KeyboardService;

    @InjectProperty("RenderGuiService")
    private renderGuiService: RenderGuiService;

    @InjectProperty("RouteFactory")
    private routeFactory: RouteFactory;

    @InjectProperty("Backlog")
    private backlog: StoryTracker;

    @InjectProperty("RouteStore")
    private routeStore: RouteStore;

    @InjectProperty("GraphService")
    private graphService: GraphService;

    private readonly worldFactory: WorldFactory;
    private readonly quarterStore: QuarterStore;
    private readonly cameraService: CameraService;

    private worldMapParser: WorldImporter;

    private _isReady = false;

    private factorySetup: FactorySetup;
    private routeSetup: RouteSetup;
    private playerSetup: PlayerSetup;
    private storySetup: StorySetup;
    private citizenSetup: CitizenSetup;
    private cameraSetup: CameraSetup;

    constructor(
        activePlayerService: ActivePlayerService,
        quarterStore: QuarterStore,
        cameraService: CameraService
    ) {
        this.quarterStore = quarterStore;
        this.cameraService = cameraService;
        this.worldProvider = lookup.worldProvider;
        this.debugService = lookup.debugService;
        this.pointerService = lookup.pointer;
        this.playerStore = lookup.playerStore;
        this.keyboardService = lookup.keyboard;
        this.renderGuiService = lookup.renderGui;
        this.routeFactory = lookup.routeFactory;
        this.backlog = lookup.backlog;
        this.routeStore = lookup.routeStore;
        this.graphService = lookup.graphService;
        
        this.worldMapParser = new WorldImporter(this.worldProvider, this.routeFactory, this.routeStore, this.backlog);
        this.worldFactory = new WorldFactory();
        this.citizenSetup = new CitizenSetup(this.graphService);

        this.factorySetup = new FactorySetup();
        this.routeSetup = new RouteSetup(this.worldProvider, this.graphService, this.routeStore);
        this.playerSetup = new PlayerSetup(this.worldProvider, this.playerStore, this.graphService, this.keyboardService, activePlayerService);
        this.cameraSetup = new CameraSetup(this.worldProvider, this.quarterStore, this.keyboardService, this.cameraService);
        
        this.storySetup = new StorySetup();
    }

    isReady() {
        return this._isReady;
    }

    async setup(scene: Scene) {
        await this.worldMapParser.parse();
        this.factorySetup.setup();
        this.storySetup.setup();

        this.worldProvider.world = await this.worldFactory.createWorldObj(scene);
        await this.backlog.processor.process();
        this.routeSetup.setup();
        this.playerSetup.setup();

        this.cameraSetup.setup();

        this.debugService.addGuiComponent(new DebugPanel());
        this.debugService.render();
        this.pointerService.listen();

        await this.citizenSetup.setup();
        
        this._isReady = true;
        
        this.renderGuiService.render();
    }
}
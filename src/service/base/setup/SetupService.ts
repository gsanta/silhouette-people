import { Scene } from "babylonjs";
import { InjectProperty } from "../../../di/diDecorators";
import { PersonItem } from "../../../model/item/character/CharacterItem";
import { CitizenStore } from "../../../store/CitizenStore";
import { RouteStore } from "../../../store/RouteStore";
import { CitizenSetup } from "../../citizen/CitizenSetup";
import { ToolService } from "../../edit/ToolService";
import { lookup } from "../../Lookup";
import { FactorySetup } from "../../object/mesh/FactorySetup";
import { MeshFactory } from "../../object/mesh/MeshFactory";
import { RouteFactory } from "../../object/route/RouteFactory";
import { WorldFactory } from "../../object/world/WorldFactory";
import { WorldImporter } from "../import/WorldImporter";
import { WorldProvider } from "../../WorldProvider";
import { PlayerStore } from "../../player/PlayerStore";
import { StorySetup } from "../../story/StorySetup";
import { StoryTracker } from "../../story/StoryTracker";
import { RenderGuiService } from "../../ui/RenderGuiService";
import { StageController } from "../../ui/stage/StageController";
import { StageSetup } from "../../ui/stage/StageSetup";
import { DebugPanel } from "../debug/DebugPanel";
import { DebugService } from "../debug/DebugService";
import { KeyboardService } from "../keyboard/KeyboardService";
import { PointerService } from "../pointer/PointerService";
import { BikeParenter } from "./BikeParenter";
import { RouteSetup } from "../../object/route/RouteSetup";
import { GraphService } from "../../graph/GraphService";
import { PlayerSetup } from "../../player/PlayerSetup";
import { MaterialStore } from "../../../store/MaterialStore";

export class SetupService {

    @InjectProperty("WorldProvider")
    private worldProvider: WorldProvider;

    @InjectProperty("DebugService")
    private debugService: DebugService;

    @InjectProperty("PointerService")
    private pointerService: PointerService;

    @InjectProperty("PlayerStore")
    private playerStore: PlayerStore;

    @InjectProperty("ToolService")
    private toolService: ToolService;

    @InjectProperty("KeyboardService")
    private keyboardService: KeyboardService;

    @InjectProperty("RenderGuiService")
    private renderGuiService: RenderGuiService;

    @InjectProperty("StageController")
    private stageController: StageController;

    @InjectProperty("RouteFactory")
    private routeFactory: RouteFactory;

    @InjectProperty("MeshFactory")
    private meshFactory: MeshFactory;

    @InjectProperty("CitizenStore")
    private citizenStore: CitizenStore;

    @InjectProperty("Backlog")
    private backlog: StoryTracker;

    @InjectProperty("RouteStore")
    private routeStore: RouteStore;

    @InjectProperty("GraphService")
    private graphService: GraphService;

    @InjectProperty("MaterialStore")
    private materialStore: MaterialStore;

    private readonly worldFactory: WorldFactory;

    private worldMapParser: WorldImporter;

    private _isReady = false;

    private bikeParenter: BikeParenter;

    private factorySetup: FactorySetup;
    private routeSetup: RouteSetup;
    private playerSetup: PlayerSetup;
    private storySetup: StorySetup;
    private citizenSetup: CitizenSetup;
    private stageSetup: StageSetup;

    constructor() {
        this.worldProvider = lookup.worldProvider;
        this.debugService = lookup.debugService;
        this.pointerService = lookup.pointer;
        this.playerStore = lookup.playerStore;
        this.toolService = lookup.toolService;
        this.keyboardService = lookup.keyboard;
        this.renderGuiService = lookup.renderGui;
        this.stageController = lookup.stageController;
        this.routeFactory = lookup.routeFactory;
        this.meshFactory = lookup.meshFactory;
        this.citizenStore = lookup.citizenStore;
        this.backlog = lookup.backlog;
        this.routeStore = lookup.routeStore;
        this.graphService = lookup.graphService;
        this.materialStore = lookup.materialStore;
        
        this.worldMapParser = new WorldImporter(this.worldProvider, this.routeFactory, this.routeStore, this.backlog);
        this.worldFactory = new WorldFactory(this.meshFactory);
        this.citizenSetup = new CitizenSetup(this.worldMapParser);

        this.factorySetup = new FactorySetup();
        this.routeSetup = new RouteSetup(this.worldProvider, this.graphService);
        this.playerSetup = new PlayerSetup(this.worldProvider, this.playerStore, this.graphService, this.materialStore);
        this.storySetup = new StorySetup();
        this.stageSetup = new StageSetup();
        this.bikeParenter = new BikeParenter();
    }

    isReady() {
        return this._isReady;
    }

    async setup(scene: Scene) {
        await this.worldMapParser.parse();
        this.factorySetup.setup();
        this.storySetup.setup();
        this.stageSetup.setup();

        this.worldProvider.world = await this.worldFactory.createWorldObj(scene);
        await this.backlog.processor.process();
        this.routeSetup.setup();
        this.bikeParenter.parentToBike(<PersonItem> this.playerStore.getPlayerById('player1'), this.playerStore.getBikes()[0], this.keyboardService);
        this.playerSetup.setup();


        // this.controllerService.setMasterController(new NormalModeController(this.controllerService.getCameraController()));
        this.debugService.addGuiComponent(new DebugPanel());
        this.debugService.render();
        this.pointerService.listen();

        await this.citizenSetup.setup();
        
        this._isReady = true;
        
        this.toolService.setSelectedTool(this.toolService.path, true);

        this.stageController.stages.forEach(stage => stage.resetStage());
        this.stageController.getActiveStage().enterStage();

        this.renderGuiService.render();
    }
}
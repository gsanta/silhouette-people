import { Scene } from "babylonjs";
import { InjectProperty } from "../../../di/diDecorators";
import { DebugPanel } from "../debug/DebugPanel";
import { PointerService } from "../pointer/PointerService";
import { lookup, Lookup } from "../../Lookup";
import { BikeParenter } from "./BikeParenter";
import { MeshStore } from "../../../store/MeshStore";
import { PersonItem } from "../../../model/item/character/CharacterItem";
import { ToolService } from "../../edit/ToolService";
import { KeyboardService } from "../keyboard/KeyboardService";
import { StageSetup } from "../../ui/stage/StageSetup";
import { RenderGuiService } from "../../ui/RenderGuiService";
import { StageController } from "../../ui/stage/StageController";
import { WorldMapParser } from "../../object/world/WorldMapParser";
import { RouteFactory } from "../../object/route/RouteFactory";
import { WorldFactory } from "../../object/world/WorldFactory";
import { WorldProvider } from "../../object/world/WorldProvider";
import { DebugService } from "../debug/DebugService";
import { CitizenSetup } from "../../citizen/CitizenSetup";
import { RoutePool } from "../../citizen/RoutePool";
import { MeshFactory } from "../../object/mesh/MeshFactory";
import { CitizenStore } from "../../../store/CitizenStore";
import { FactorySetup } from "../../object/mesh/FactorySetup";
import { Backlog } from "../../story/Backlog";
import { PlayerStore } from "../../player/PlayerStore";

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
    private backlog: Backlog;

    private readonly worldFactory: WorldFactory;

    private worldMapParser: WorldMapParser;

    private _isReady = false;

    private bikeParenter: BikeParenter;

    private factorySetup: FactorySetup;
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
        
        this.worldMapParser = new WorldMapParser(this.worldProvider, this.routeFactory, this.backlog);
        this.worldFactory = new WorldFactory(this.meshFactory);
        this.citizenSetup = new CitizenSetup(this.worldMapParser);

        this.factorySetup = new FactorySetup();
        this.stageSetup = new StageSetup();
        this.bikeParenter = new BikeParenter();
    }

    isReady() {
        return this._isReady;
    }

    async setup(scene: Scene) {
        await this.worldMapParser.parse();
        this.factorySetup.setup();
        this.stageSetup.setup();

        this.worldProvider.world = await this.worldFactory.createWorldObj(scene);
        await this.backlog.processor.process();

        // this.controllerService.setMasterController(new NormalModeController(this.controllerService.getCameraController()));
        this.debugService.addGuiComponent(new DebugPanel());
        this.debugService.render();
        this.pointerService.listen();

        await this.citizenSetup.setup();
        
        this._isReady = true;
        
        this.toolService.setSelectedTool(this.toolService.path, true);

        this.bikeParenter.parentToBike(<PersonItem> this.playerStore.getPlayerById('player1'), this.playerStore.getBikes()[0], this.keyboardService);

        this.stageController.stages.forEach(stage => stage.resetStage());
        this.stageController.getActiveStage().enterStage();

        this.renderGuiService.render();
    }
}
import { Scene } from "babylonjs";
import { InjectProperty } from "../../../di/diDecorators";
import { DebugPanel } from "../debug/DebugPanel";
import { PointerService } from "../pointer/PointerService";
import { lookup, Lookup } from "../../Lookup";
import { BikeParenter } from "./BikeParenter";
import { MeshStore } from "../../../store/MeshStore";
import { HumanoidObj } from "../../../model/object/character/CharacterObj";
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

export class SetupService {

    @InjectProperty("WorldProvider")
    private worldProvider: WorldProvider;

    @InjectProperty("DebugService")
    private debugService: DebugService;

    @InjectProperty("PointerService")
    private pointerService: PointerService;

    @InjectProperty("MeshStore")
    private meshStore: MeshStore;

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

    private readonly worldFactory: WorldFactory;

    private worldMapParser: WorldMapParser;

    private _isReady = false;

    private bikeParenter: BikeParenter;

    private citizenSetup: CitizenSetup;
    private stageSetup: StageSetup;

    constructor() {
        this.worldProvider = lookup.worldProvider;
        this.debugService = lookup.debugService;
        this.pointerService = lookup.pointer;
        this.meshStore = lookup.meshStore;
        this.toolService = lookup.toolService;
        this.keyboardService = lookup.keyboard;
        this.renderGuiService = lookup.renderGui;
        this.stageController = lookup.stageController;
        this.routeFactory = lookup.routeFactory;
        
        this.worldMapParser = new WorldMapParser(this.worldProvider, this.routeFactory);
        this.worldFactory = new WorldFactory(this.worldMapParser);
        this.citizenSetup = new CitizenSetup(this.worldMapParser);

        this.stageSetup = new StageSetup();
        this.bikeParenter = new BikeParenter();
    }

    isReady() {
        return this._isReady;
    }

    async setup(scene: Scene) {
        await this.worldMapParser.parse();
        this.citizenSetup.setup();
        this.stageSetup.setup();
        // this.controllerService.setMasterController(new NormalModeController(this.controllerService.getCameraController()));
        this.worldProvider.world = await this.worldFactory.createWorldObj(scene);
        this.debugService.addGuiComponent(new DebugPanel());
        this.debugService.render();
        this.pointerService.listen();
        
        this._isReady = true;
        
        this.toolService.setSelectedTool(this.toolService.path, true);

        this.bikeParenter.parentToBike(<HumanoidObj> this.meshStore.getById('player1'), this.meshStore.getBikes()[0], this.keyboardService);

        this.stageController.stages.forEach(stage => stage.resetStage());
        this.stageController.getActiveStage().enterStage();

        this.renderGuiService.render();
    }
}
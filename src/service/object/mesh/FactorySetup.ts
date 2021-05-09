import { InjectProperty } from "../../../di/diDecorators";
import { AssetContainerStore } from "../../../store/AssetContainerStore";
import { MeshStore } from "../../../store/MeshStore";
import { RouteStore } from "../../../store/RouteStore";
import { ActivePlayerService } from "../../ActivePlayerService";
import { AbstractPropertyParser } from "../../base/import/AbstractPropertyParser";
import { ActivePlayerPropertyParser } from "../../base/import/ActivePlayerPropertyParser";
import { CollisionPropertyParser } from "../../base/import/CollisionPropertyParser";
import { HiddenPropertyParser } from "../../base/import/HiddenPropertyParser";
import { IdPropertyParser } from "../../base/import/IdPropertyParser";
import { InputManagerPropertyParser } from "../../base/import/InputManagerPropertyParser";
import { ModelPropertyParser } from "../../base/import/ModelPropertyParser";
import { PhysicsPropertyParser } from "../../base/import/PhysicsPropertyParser";
import { PositionPropertyParser } from "../../base/import/PositionPropertyParser";
import { RotatePropertyParser } from "../../base/import/RotatePropertyParser";
import { RoutePropertyParser } from "../../base/import/RoutePropertyParser";
import { StatePropertyParser } from "../../base/import/StatePropertyParser";
import { TagPropertyParser } from "../../base/import/TagPropertyParser";
import { TexturePropertyParser } from "../../base/import/TexturePropertyParser";
import { WalkerPropertyParser } from "../../base/import/WalkerPropertyParser";
import { KeyboardService } from "../../base/keyboard/KeyboardService";
import { lookup } from "../../Lookup";
import { Backlog } from "../../story/Backlog";
import { WorldProvider } from "../world/WorldProvider";
import { MeshFactory } from "./MeshFactory";
import { MeshItemLoader } from "./MeshItemLoader";


export class FactorySetup {

    @InjectProperty('WorldProvider')
    private worldProvider: WorldProvider;

    @InjectProperty('AssetContainerStore')
    private assetContainerStore: AssetContainerStore;

    @InjectProperty('KeyboardService')
    private keyboardService: KeyboardService;
    
    @InjectProperty('ActivePlayerService')
    private activePlayerService: ActivePlayerService;

    @InjectProperty('MeshFactory')
    private meshFactory: MeshFactory;

    @InjectProperty('MeshFactory')
    private meshStore: MeshStore;

    @InjectProperty('Backlog')
    private backlog: Backlog;

    @InjectProperty('RouteStore')
    private routeStore: RouteStore;

    private meshItemLoader: MeshItemLoader;

    constructor() {
        this.worldProvider = lookup.worldProvider;
        this.assetContainerStore = lookup.assetContainerStore;
        this.keyboardService = lookup.keyboard;
        this.activePlayerService = lookup.activePlayerService;
        this.meshFactory = lookup.meshFactory;
        this.backlog = lookup.backlog;
        this.meshStore = lookup.meshStore;
        this.routeStore = lookup.routeStore;
    }

    setup() {
        this.meshFactory.setPropertyParsers(this.setupPropertyParsers());

        this.meshItemLoader = new MeshItemLoader(this.backlog, this.meshStore, this.meshFactory);

        this.backlog.processor.registerLoader(this.meshItemLoader);
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
            new InputManagerPropertyParser(this.keyboardService),
            new TagPropertyParser(),
            new HiddenPropertyParser(),
            new RotatePropertyParser(),
            new IdPropertyParser(),
            new ActivePlayerPropertyParser(this.activePlayerService),
            new RoutePropertyParser(this.routeStore)
        ]
    }
}
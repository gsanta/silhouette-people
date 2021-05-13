import { InjectProperty } from "../../../di/diDecorators";
import { AssetContainerStore } from "../../../store/AssetContainerStore";
import { RouteStore } from "../../../store/RouteStore";
import { ActivePlayerService } from "../../ActivePlayerService";
import { ActivePlayerPropertyParser } from "../../base/import/properties/ActivePlayerPropertyParser";
import { CollisionPropertyParser } from "../../base/import/properties/CollisionPropertyParser";
import { HiddenPropertyParser } from "../../base/import/properties/HiddenPropertyParser";
import { IdPropertyParser } from "../../base/import/properties/IdPropertyParser";
import { InputManagerPropertyParser } from "../../base/import/properties/InputManagerPropertyParser";
import { ModelPropertyParser } from "../../base/import/properties/ModelPropertyParser";
import { PhysicsPropertyParser } from "../../base/import/properties/PhysicsPropertyParser";
import { PositionPropertyParser } from "../../base/import/properties/PositionPropertyParser";
import { RotatePropertyParser } from "../../base/import/properties/RotatePropertyParser";
import { RoutePropertyParser } from "../../base/import/properties/RoutePropertyParser";
import { StatePropertyParser } from "../../base/import/properties/StatePropertyParser";
import { TagPropertyParser } from "../../base/import/properties/TagPropertyParser";
import { TexturePropertyParser } from "../../base/import/properties/TexturePropertyParser";
import { WalkerPropertyParser } from "../../base/import/properties/WalkerPropertyParser";
import { KeyboardService } from "../../base/keyboard/KeyboardService";
import { lookup } from "../../Lookup";
import { WorldProvider } from "../../WorldProvider";
import { MeshFactory } from "./MeshFactory";

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

    @InjectProperty('RouteStore')
    private routeStore: RouteStore;

    constructor() {
        this.worldProvider = lookup.worldProvider;
        this.assetContainerStore = lookup.assetContainerStore;
        this.keyboardService = lookup.keyboard;
        this.activePlayerService = lookup.activePlayerService;
        this.meshFactory = lookup.meshFactory;
        this.routeStore = lookup.routeStore;
    }

    setup() {
        this.meshFactory.setPropertyParsers(this.setupPropertyParsers());
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
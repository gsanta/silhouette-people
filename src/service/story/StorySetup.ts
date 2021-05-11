import { InjectProperty } from "../../di/diDecorators";
import { RouteLoader } from "../../model/item/route/RouteLoader";
import { MeshStore } from "../../store/MeshStore";
import { RouteStore } from "../../store/RouteStore";
import { lookup } from "../Lookup";
import { MeshFactory } from "../object/mesh/MeshFactory";
import { MeshItemLoader } from "../object/mesh/MeshItemLoader";
import { StoryTracker } from "./StoryTracker";

export class StorySetup {
    @InjectProperty('MeshFactory')
    private meshFactory: MeshFactory;

    @InjectProperty('MeshFactory')
    private meshStore: MeshStore;

    @InjectProperty('Backlog')
    private storyTracker: StoryTracker;

    @InjectProperty('RouteStore')
    private routeStore: RouteStore;

    private meshItemLoader: MeshItemLoader;
    private routeLoader: RouteLoader;

    constructor() {
        this.meshFactory = lookup.meshFactory;
        this.storyTracker = lookup.backlog;
        this.meshStore = lookup.meshStore;
        this.routeStore = lookup.routeStore;
    }

    setup() {
        this.meshItemLoader = new MeshItemLoader(this.storyTracker, this.meshStore, this.meshFactory);
        this.routeLoader = new RouteLoader(this.storyTracker, this.routeStore, this.meshStore);

        this.storyTracker.processor.registerLoader(this.meshItemLoader);
        this.storyTracker.processor.registerLoader(this.routeLoader);
    }
}
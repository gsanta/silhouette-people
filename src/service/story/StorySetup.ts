import { InjectProperty } from "../../di/diDecorators";
import { GameObjectStore } from "../../store/GameObjectStore";
import { lookup } from "../Lookup";
import { MeshFactory } from "../object/mesh/MeshFactory";
import { MeshItemLoader } from "../object/mesh/MeshItemLoader";
import { StoryTracker } from "./StoryTracker";

export class StorySetup {
    @InjectProperty('MeshFactory')
    private meshFactory: MeshFactory;

    @InjectProperty('MeshFactory')
    private meshStore: GameObjectStore;

    @InjectProperty('Backlog')
    private storyTracker: StoryTracker;

    private meshItemLoader: MeshItemLoader;

    constructor() {
        this.meshFactory = lookup.meshFactory;
        this.storyTracker = lookup.backlog;
        this.meshStore = lookup.meshStore;
    }

    setup() {
        this.meshItemLoader = new MeshItemLoader(this.storyTracker, this.meshStore, this.meshFactory);

        this.storyTracker.processor.registerLoader(this.meshItemLoader);
    }
}
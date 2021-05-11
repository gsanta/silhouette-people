import { MeshConfig } from "../../model/item/mesh/MeshItem";
import { StoryTracker } from "./StoryTracker";
import { StoryItem, StoryType } from "./StoryItem";
import { RouteStoryConfig } from "../../model/item/route/RouteItem";

export class StoryProducer {
    private readonly backlog: StoryTracker;
    private idCounter: number = 0;

    constructor(backlog: StoryTracker) {
        this.backlog = backlog;
    }

    createMeshStory(meshConfig: MeshConfig) {
        this.backlog.addStory(new StoryItem(`${this.idCounter}`, StoryType.CREATE_MESH, meshConfig));
        this.idCounter += 1;
    }

    createRouteStory(routeStoryConfig: RouteStoryConfig) {
        this.backlog.addStory(new StoryItem(`${this.idCounter}`, StoryType.WALK_ROUTE, routeStoryConfig));
        this.idCounter += 1;
    }
}
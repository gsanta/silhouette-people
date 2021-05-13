import { StoryTracker } from "../../../story/StoryTracker";
import { WorldMap } from "./WorldMap";


export class RouteStoryParser {

    private storyTracker: StoryTracker;

    constructor(storyTracker: StoryTracker) {
        this.storyTracker = storyTracker;
    }

    parse(json: WorldMap) {
        json.routes.forEach(routeStoryConfig => this.storyTracker.producer.createRouteStory(routeStoryConfig));
    }
}
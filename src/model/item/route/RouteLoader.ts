import { MeshConfig } from "../../../model/item/mesh/MeshItem";
import { StoryItem, StoryType } from "../../../service/story/StoryItem";
import { StoryLoader } from "../../../service/story/StoryLoader";
import { StoryTracker } from "../../../service/story/StoryTracker";
import { MeshStore } from "../../../store/MeshStore";
import { RouteStore } from "../../../store/RouteStore";
import { CharacterItem } from "../character/CharacterItem";
import { toVector2 } from "../mesh/MeshInstance";
import { RouteStoryConfig } from "./RouteItem";

export class RouteLoader implements StoryLoader {

    private readonly backlog: StoryTracker;
    private readonly routeStore: RouteStore;
    private readonly meshStore: MeshStore;

    isAsync = false;

    constructor(backlog: StoryTracker, routeStore: RouteStore, meshStore: MeshStore) {
        this.backlog = backlog;
        this.routeStore = routeStore;
        this.meshStore  = meshStore;
    }

    async checkBacklog() {
        const stories = this.backlog.getStories().filter(story => story.type === StoryType.WALK_ROUTE);

        for (let story of stories) {
            await this.processStory(<StoryItem<RouteStoryConfig>> story);
        }
    }

    private async processStory(story: StoryItem<RouteStoryConfig>) {
        const route = this.routeStore.getByName(`pre-defined-route-${story.data.routeId}`);
        const character = <CharacterItem> this.meshStore.getById(story.data.characterId);
        character.route = route;
        character.instance.setPosition2D(toVector2(route.getRoutePoints()[0].p))
        route.character = character;
        this.routeStore.addRoute(route);
    }
}
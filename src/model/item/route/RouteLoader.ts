import { StoryItem, StoryType } from "../../../service/story/StoryItem";
import { StoryLoader } from "../../../service/story/StoryLoader";
import { StoryTracker } from "../../../service/story/StoryTracker";
import { GameObjectStore } from "../../../store/GameObjectStore";
import { RouteStore } from "../../../store/RouteStore";
import { RouteStoryConfig } from "../../objects/route/RouteItem";

export class RouteLoader implements StoryLoader {

    private readonly backlog: StoryTracker;
    private readonly routeStore: RouteStore;
    private readonly meshStore: GameObjectStore;

    isAsync = false;

    constructor(backlog: StoryTracker, routeStore: RouteStore, meshStore: GameObjectStore) {
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
        // const route = this.routeStore.getByName(`pre-defined-route-${story.data.routeId}`);
        // const character = <CharacterItem> this.meshStore.getById(story.data.characterId);
        // character.route = route;
        // route.character = character;
        // this.routeStore.addRoute(route);
    }
}
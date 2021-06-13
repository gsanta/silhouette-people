import { GameObjectConfig } from "../../../model/objects/game_object/GameObject";
import { MeshStore } from "../../../store/MeshStore";
import { StoryTracker } from "../../story/StoryTracker";
import { StoryItem, StoryType } from "../../story/StoryItem";
import { StoryLoader } from "../../story/StoryLoader";
import { MeshFactory } from "./MeshFactory";

export class MeshItemLoader implements StoryLoader {

    private readonly backlog: StoryTracker;
    private readonly meshStore: MeshStore;
    private readonly meshFactory: MeshFactory;

    isAsync = true;

    constructor(backlog: StoryTracker, meshStore: MeshStore, meshFactory: MeshFactory) {
        this.backlog = backlog;
        this.meshStore = meshStore;
        this.meshFactory = meshFactory;
    }

    async checkBacklogAsync() {
        const stories = <StoryItem<GameObjectConfig>[]> this.backlog.getStories().filter(story => story.type === StoryType.CREATE_MESH);

        for (let story of stories) {
            await this.processStory(story);
        }
    }

    private async processStory(story: StoryItem<GameObjectConfig>) {
        const meshItem = await this.meshFactory.createFromConfig(story.data);
        this.meshStore.addItem(meshItem);
    }
}
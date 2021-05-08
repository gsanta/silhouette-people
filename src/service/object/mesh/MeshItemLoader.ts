import { MeshConfig } from "../../../model/item/mesh/MeshItem";
import { MeshStore } from "../../../store/MeshStore";
import { Backlog } from "../../story/Backlog";
import { StoryItem, StoryType } from "../../story/StoryItem";
import { StoryLoader } from "../../story/StoryLoader";
import { MeshFactory } from "./MeshFactory";

export class MeshItemLoader implements StoryLoader {

    private readonly backlog: Backlog;
    private readonly meshStore: MeshStore;
    private readonly meshFactory: MeshFactory;

    constructor(backlog: Backlog, meshStore: MeshStore, meshFactory: MeshFactory) {
        this.backlog = backlog;
        this.meshStore = meshStore;
        this.meshFactory = meshFactory;
    }

    async checkBacklog() {
        const stories = <StoryItem<MeshConfig>[]> this.backlog.getStories().filter(story => story.type === StoryType.CREATE_MESH);

        for (let story of stories) {
            await this.processStory(story);
        }
    }

    private async processStory(story: StoryItem<MeshConfig>) {
        const meshItem = await this.meshFactory.create(story.data);
        this.meshStore.addObj(meshItem);
    }
}
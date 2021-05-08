import { MeshConfig } from "../../model/object/mesh/MeshObj";
import { Backlog } from "./Backlog";
import { StoryItem, StoryType } from "./StoryItem";

export class StoryProducer {
    private readonly backlog: Backlog;

    constructor(backlog: Backlog) {
        this.backlog = backlog;
    }

    createMeshStory(meshConfig: MeshConfig) {
        this.backlog.addStory(new StoryItem(StoryType.CREATE_MESH, meshConfig));
    }
}
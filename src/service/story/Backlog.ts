import { BacklogProcessor } from "./BacklogProcessor";
import { StoryItem } from "./StoryItem";
import { StoryProducer } from "./StoryProducer";

export class Backlog {
    private stories: StoryItem<any>[] = [];

    readonly producer: StoryProducer;
    readonly processor: BacklogProcessor;

    constructor() {
        this.producer = new StoryProducer(this);
        this.processor = new BacklogProcessor();
    }

    addStory(...story: StoryItem<any>[]) {
        this.stories.push(...story);
    }

    getStories(): StoryItem<any>[] {
        return this.stories;
    }

    removeStory(story: StoryItem<any>) {
        this.stories = this.stories.filter(s => s !== story);
    }
}
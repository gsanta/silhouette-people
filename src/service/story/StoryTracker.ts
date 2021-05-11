import { StoryProcessor } from "./StoryProcessor";
import { StoryItem } from "./StoryItem";
import { StoryProducer } from "./StoryProducer";

export class StoryTracker {
    private stories: StoryItem<any>[] = [];

    readonly producer: StoryProducer;
    readonly processor: StoryProcessor;

    constructor() {
        this.producer = new StoryProducer(this);
        this.processor = new StoryProcessor();
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
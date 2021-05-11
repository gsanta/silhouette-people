import { StoryLoader } from "./StoryLoader";


export class StoryProcessor {
    private loaders: StoryLoader[] = [];

    registerLoader(loader: StoryLoader) {
        this.loaders.push(loader);
    }

    async process() {
        for (let loader of this.loaders) {
            if (loader.isAsync) {
                await loader.checkBacklogAsync();
            } else {
                loader.checkBacklog();
            }
        }
    }
}
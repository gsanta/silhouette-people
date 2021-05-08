import { StoryLoader } from "./StoryLoader";


export class BacklogProcessor {
    private loaders: StoryLoader[] = [];

    registerLoader(loader: StoryLoader) {
        this.loaders.push(loader);
    }

    async process() {
        for (let loader of this.loaders) {
            await loader.checkBacklog();
        }
    }
}
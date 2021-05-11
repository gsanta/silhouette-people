
export interface StoryLoader {
    isAsync: boolean;
    checkBacklogAsync?(): Promise<void>;
    checkBacklog?(): void;
}
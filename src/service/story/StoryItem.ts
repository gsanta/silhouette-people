
export enum StoryType {
    CREATE_MESH = 'CREATE_MESH',
    WALK_ROUTE = 'WALK_ROUTE'
}

export enum ConditionType {
    EXECUTE_AFTER_STORY = 'EXECUTE_AFTER_STORY'
}

export interface StoryCondition {
    conditionType: ConditionType;

    checkCondition(): boolean;
}

export interface StoryConfig {
    condition?: StoryCondition;
    onFinish?: () => void;
}

export class StoryItem<D> {
    readonly id: string;
    readonly type: string;
    readonly data: D;
    readonly condition: StoryCondition;
    private done = false;
    private readonly onFinish: () => void;

    private readonly onDoneFuncs: (() => void)[] = [];

    constructor(id: string, type: string, data: D, config?: StoryConfig) {
        this.id = id;
        this.type = type;
        this.data = data;

        if (config) {
            this.condition = config.condition;
            this.onFinish = config.onFinish;
        }
    }

    isDone() {
        return this.done;
    }

    onDone(func: () => void) {
        this.onDoneFuncs.push(func);
    }
}

export enum StoryType {
    CREATE_MESH = 'CREATE_MESH'
}

export class StoryItem<D> {
    readonly type: string;
    readonly data: D;
    readonly condition: any;

    constructor(type: string, data: D, condition?: any) {
        this.type = type;
        this.data = data;
        this.condition = condition;
    }
}
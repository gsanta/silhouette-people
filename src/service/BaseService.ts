import { SceneService } from "./SceneService";


export class BaseService {

    protected readonly sceneService: SceneService;

    constructor(sceneService: SceneService) {
        this.sceneService = sceneService;
        this.sceneService.addBaseService(this);
    }

    awake() {}
    update(deltaTime: number) {}
}
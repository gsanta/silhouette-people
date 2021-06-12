import { RouteController } from "../../../model/item/route/RouteController";
import { RouteControllerListener } from "../../../model/item/route/RouteControllerListener";
import { CitizenStore } from "../../../store/CitizenStore";
import { CollisionAvoidance } from "./CollisionAvoidance";
import { CollisionSensor } from "./CollisionSensor";

export class CollisionAvoidanceAdapter extends RouteControllerListener {

    private readonly collisionAvoidance: CollisionAvoidance;
    private readonly citizenStore: CitizenStore;
    private readonly walker: RouteController;

    constructor(walker: RouteController, citizenStore: CitizenStore) {
        super();
        this.walker = walker;
        this.collisionAvoidance = new CollisionAvoidance(this.walker, new CollisionSensor(walker.getCharacter()));
        this.citizenStore = citizenStore;
    }

    onWalk() {
        const citizens = this.citizenStore.getAll().filter(citizen => citizen !== this.walker.getCharacter());
        this.collisionAvoidance.avoid(citizens);
    }
}
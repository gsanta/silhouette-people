import { RouteWalker } from "../../../model/item/route/RouteWalker";
import { RouteWalkerListener } from "../../../model/item/route/RouteWalkerListener";
import { CitizenStore } from "../../../store/CitizenStore";
import { CollisionAvoidance } from "./CollisionAvoidance";
import { CollisionSensor } from "./CollisionSensor";

export class CollisionAvoidanceAdapter extends RouteWalkerListener {

    private readonly collisionAvoidance: CollisionAvoidance;
    private readonly citizenStore: CitizenStore;
    private readonly walker: RouteWalker;

    constructor(walker: RouteWalker, citizenStore: CitizenStore) {
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
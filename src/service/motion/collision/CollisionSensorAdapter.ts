import { Vector2, Vector3 } from "babylonjs";
import { toVector3 } from "../../../helpers";
import { RouteWalker } from "../../../model/item/route/RouteWalker";
import { RouteWalkerListener } from "../../../model/item/route/RouteWalkerListener";
import { CitizenStore } from "../../../store/CitizenStore";
import { GraphEdge, GraphVertex } from "../../graph/GraphImpl";
import { CollisionSensor } from "./CollisionSensor";


export class CollisionSensorAdapter extends RouteWalkerListener {

    private readonly sensor: CollisionSensor;
    private readonly citizenStore: CitizenStore;
    private readonly walker: RouteWalker;

    constructor(walker: RouteWalker, citizenStore: CitizenStore) {
        super();
        this.walker = walker;
        this.sensor = new CollisionSensor(walker.getCharacter(), 1);
        this.citizenStore = citizenStore;
    }

    onWalk() {
        const points = this.sensor.getSteeringPoints(this.citizenStore.getAll());

        if (points[0] !== undefined) {
            const point = points[0];

            const currentEdge = this.walker.getEdge();
            const character = this.walker.getCharacter();
            const targetPos = character.position.add(toVector3(point.multiply(new Vector2(3, 3))));
    
            if (currentEdge) {
                const vertex1 = new GraphVertex(null, character.position)
                const vertex2 = new GraphVertex(null, targetPos);
                const vertex3 = this.walker.getTarget();
                const newEdge1 = new GraphEdge(vertex1, vertex2);
                const newEdge2 = new GraphEdge(vertex2, vertex3);
                const index = this.walker.getRoute().getIndex(currentEdge);
                const newRoute = this.walker.getRoute().insert(index, newEdge2).insert(index, newEdge1);
                this.walker.setRoute(newRoute);
                this.walker.setEdge(newEdge1);
            }
        }
    }
}
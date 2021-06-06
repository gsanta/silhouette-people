import { Vector2 } from "babylonjs";
import { toVector3 } from "../../../helpers";
import { CharacterItem } from "../../../model/item/character/CharacterItem";
import { RouteWalker } from "../../../model/item/route/RouteWalker";
import { VertexInjector } from "../../../model/item/route/VertexInjector";
import { GraphVertex } from "../../graph/GraphImpl";
import { CollisionSensor } from "./CollisionSensor";

export class CollisionAvoidance {
    private readonly walker: RouteWalker;
    private readonly sensor: CollisionSensor;
    private readonly vertexInjector: VertexInjector;

    constructor(walker: RouteWalker, sensor: CollisionSensor) {
        this.walker = walker;
        this.sensor = sensor;
        this.vertexInjector = new VertexInjector();
    }

    avoid(characters: CharacterItem[]) {
        const steerintPoints = this.sensor.getSteeringPoints(characters);

        if (steerintPoints[0] !== undefined) {
            const point = steerintPoints[0];

            const character = this.walker.getCharacter();
            const targetPos = toVector3(point);

            const vertex1 = new GraphVertex(null, character.position)
            const vertex2 = new GraphVertex(null, targetPos);
            const currentEdgeIndex = this.walker.getRoute().getIndex(this.walker.getEdge());

            const route = this.vertexInjector.inject(this.walker.getRoute(), this.walker.getEdge(), [vertex1, vertex2]);
            this.walker.setRoute(route);
            this.walker.setEdge(route.getEdge(currentEdgeIndex));
        }
    }
}
import { Vector2, Vector3 } from "babylonjs";
import { toVector2, toVector3 } from "../../../helpers";
import { CharacterItem } from "../../../model/item/character/CharacterItem";
import { RouteWalker } from "../../../model/item/route/RouteWalker";
import { VertexInjector } from "../../../model/item/route/VertexInjector";
import { Rotation } from "../../../model/math/Rotation";
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
        const angles = this.sensor.getSteeringAngles(characters);

        if (angles) {
            const character = this.walker.getCharacter();
            const characterRot = Rotation.FromVector(toVector2(character.velocity));
            const angle = new Rotation(angles.angle1);
            const steeringPos = new Rotation(angles.angle2).toVector3().multiply(new Vector3(3, 1, 3));
            const targetPos = character.position.add(steeringPos);

            const vertex1 = new GraphVertex(null, character.position)
            const vertex2 = new GraphVertex(null, targetPos);
            const currentEdgeIndex = this.walker.getRoute().getIndex(this.walker.getEdge());

            const route = this.vertexInjector.inject(this.walker.getRoute(), this.walker.getEdge(), [vertex1, vertex2]);
            this.walker.setRoute(route);
            this.walker.setEdge(route.getEdge(currentEdgeIndex + 1));
        }
    }
}
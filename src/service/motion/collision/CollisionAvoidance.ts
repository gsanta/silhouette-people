import { Vector3 } from "babylonjs";
import { toVector2 } from "../../../helpers";
import { GameObject } from "../../../model/objects/game_object/GameObject";
import { RouteController } from "../../../model/objects/game_object/controller_route/RouteController";
import { VertexInjector } from "../../../model/objects/route/VertexInjector";
import { Rotation } from "../../../model/math/Rotation";
import { GraphVertex } from "../../graph/GraphImpl";
import { CollisionSensor } from "./CollisionSensor";

export class CollisionAvoidance {
    private readonly walker: RouteController;
    private readonly sensor: CollisionSensor;
    private readonly vertexInjector: VertexInjector;

    constructor(walker: RouteController, sensor: CollisionSensor) {
        this.walker = walker;
        this.sensor = sensor;
        this.vertexInjector = new VertexInjector();
    }

    avoid(characters: GameObject[]) {
        const angles = this.sensor.getSteeringAngles(characters);

        if (angles) {
            const character = this.walker.getCharacter();
            const characterRot = Rotation.FromVector(toVector2(character.motionController.velocity));
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
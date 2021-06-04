import { Vector2 } from "babylonjs";
import { toVector2 } from "../../../helpers";
import { Circle } from "../../../model/shape/Circle";
import { CharacterItem } from "../../../model/item/character/CharacterItem";
import { MeshItem } from "../../../model/item/mesh/MeshItem";

export class CollisionSensor {
    private readonly character: CharacterItem;
    private readonly sensorDistance: number;

    constructor(character: CharacterItem, sensorDistance: number) {
        this.character = character;
        this.sensorDistance = sensorDistance;
    }

    getSteeringPoints(obstacles: MeshItem[]): Vector2[] {
        const pos = this.character.position2D;
        const velocity = toVector2(this.character.velocity);

        const ahead = pos.add(velocity.multiply(new Vector2(this.sensorDistance, this.sensorDistance)));

        var mostThreatening = this.findMostThreateningObstacle(ahead, obstacles);

        if (mostThreatening) {
            const circle = new Circle(toVector2(mostThreatening.position), mostThreatening.radius);
            return circle.tangentFromExternalPoint(pos)
                .map(lineEq => lineEq ? circle.intersection(lineEq) : undefined)
                .flat()
                .filter(point => point);
        }

        return [];
    }

    private findMostThreateningObstacle(ahead: Vector2, obstacles: MeshItem[]) {
        const pos = this.character.position2D;
        var closest: MeshItem = null;
        
        for (let obstacle of obstacles) {
            if (obstacle === this.character) {
                continue;
            }

            const obstaclePos = obstacle.position2D;
            var collision = this.pointIsWithinCircle(ahead, obstacle);

            if (collision && ( !closest || this.isCloser(pos, obstaclePos, closest.position2D))) {
                closest = obstacle;
            }
        }

        return closest;
    }

    private isCloser(origin: Vector2, target1: Vector2, target2: Vector2) {
        return this.distance(origin, target1) < this.distance(origin, target2);
    }

    private pointIsWithinCircle(ahead: Vector2, obstacle: MeshItem) {
        const pos = obstacle.position2D;

        return this.distance(pos, ahead) <= obstacle.radius;
    }

    private distance(a: Vector2, b: Vector2) {
        return Math.sqrt((a.x - b.x) * (a.x - b.x)  + (a.y - b.y) * (a.y - b.y));
    }
}
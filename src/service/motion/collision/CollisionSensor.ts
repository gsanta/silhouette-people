import { Tools, Vector2 } from "babylonjs";
import { toVector2 } from "../../../helpers";
import { Circle } from "../../../model/shape/Circle";
import { CharacterItem } from "../../../model/item/character/CharacterItem";
import { MeshItem } from "../../../model/item/mesh/MeshItem";
import { Rotation } from "../../../model/math/Rotation";

export interface CollisionSensorResult {
    angle1: number;
    angle2: number;
}

export class CollisionSensor {
    private readonly character: CharacterItem;

    private readonly steeringOffset: number;

    constructor(character: CharacterItem, steeringOffset = Tools.ToRadians(10)) {
        this.character = character;
        this.steeringOffset = steeringOffset;
    }

    getSteeringAngles(obstacles: MeshItem[]): CollisionSensorResult {
        const pos = this.character.position2D;
        const velocity = toVector2(this.character.velocity);

        const sensorDistance = this.character.collisionSensorDistance;
        const ahead = pos.add(velocity.multiply(new Vector2(sensorDistance, sensorDistance)));

        var mostThreatening = this.findMostThreateningObstacle(ahead, obstacles);
        
        if (mostThreatening) {
            const circle = new Circle(toVector2(mostThreatening.position), mostThreatening.radius);
            const intersections = circle.tangentFromExternalPoint(pos).map(t => t ? circle.intersection(t)[0] : undefined);

            if (intersections) {
                return this.getResult(intersections[0], intersections[1]);
            }

        }

        return undefined;
    }

    private getResult(intersection1: Vector2, intersection2: Vector2): CollisionSensorResult {
        intersection1 = intersection1.subtract(this.character.position2D);
        intersection2 = intersection2.subtract(this.character.position2D);
        const rot1 = Rotation.FromVector(intersection1);
        const rot2 = Rotation.FromVector(intersection2);
        const middle = rot1.middle(rot2.rad);

        return {
            angle1: this.addOffsetToRotation(rot1, middle).rad,
            angle2: this.addOffsetToRotation(rot2, middle).rad,
        }

    }

    private addOffsetToRotation(rot: Rotation, middle: Rotation): Rotation {
        const pos = rot.add(this.steeringOffset);
        const neg = rot.add(-this.steeringOffset);

        return pos.diff(middle.rad).abs > neg.diff(middle.rad).abs ? pos : neg; 
    }

    getSteeringPoints(obstacles: MeshItem[]): Vector2[] {
        const pos = this.character.position2D;
        const velocity = toVector2(this.character.velocity);

        const sensorDistance = this.character.collisionSensorDistance;
        const ahead = pos.add(velocity.multiply(new Vector2(sensorDistance, sensorDistance)));

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
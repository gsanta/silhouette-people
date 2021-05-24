import { Vector3 } from "babylonjs";
import { CharacterItem } from "../../../character/CharacterItem";
import { MeshInstance } from "../../../mesh/MeshInstance";
import { MeshItem } from "../../../mesh/MeshItem";

export class CollisionSensor {
    private readonly character: CharacterItem;
    private readonly longRadius = 1;
    private readonly shortRadius = 1;
    private readonly maxAvoidanceForce = 1;

    constructor(character: CharacterItem) {
        this.character = character;
    }

    steer(obstacles: MeshItem[]) {
        const pos = this.character.position;
        const velocity = this.character.velocity;

        const ahead = pos.add(velocity.multiply(new Vector3(this.longRadius, pos.y, this.longRadius)));

        const ahead2 = pos.add(velocity.multiply(new Vector3(this.shortRadius, pos.y, this.shortRadius)));
        var mostThreatening = this.findMostThreateningObstacle(ahead, ahead2, obstacles);
        var avoidance = new BABYLON.Vector3(0, 0, 0);

        if (mostThreatening) {
            avoidance.x = ahead.x - mostThreatening.center.x;
            avoidance.z = -1 * (ahead.z - mostThreatening.center.z);

            avoidance = avoidance.normalize();
            avoidance = avoidance.scale(this.maxAvoidanceForce);
        } else {
            avoidance = avoidance.scale(0);
        }

        return avoidance;
    }

    findMostThreateningObstacle(ahead: Vector3, ahead2: Vector3, obstacles: MeshItem[]) {
        const pos = this.character.position;
        var mostThreatening = null;
        
        for (let i = 0; i < obstacles.length; i++) {
            var obstacle = obstacles[i];
            const obstaclePos = obstacle.position;
            var collision = this.lineIntersectsCircle(ahead, ahead2, obstacle);

            if (collision && 
                (
                    !mostThreatening ||
                    this.distance(pos, obstaclePos) < this.distance(pos, mostThreatening.center)
                )
            ) {
                mostThreatening = obstacle;
            }
        }

        if (mostThreatening) {
            mostThreatening.applyRedMaterial();
        }

        return mostThreatening;
    }

    distance(a: Vector3, b: Vector3) {
        return Math.sqrt((a.x - b.x) * (a.x - b.x)  + (a.z - b.z) * (a.z - b.z));
    }

    lineIntersectsCircle(ahead: Vector3, ahead2: Vector3, obstacle: MeshItem) {
        const pos = obstacle.position;

        return this.distance(pos, ahead) <= obstacle.radius || this.distance(pos, ahead2) <= obstacle.radius;
    }
}
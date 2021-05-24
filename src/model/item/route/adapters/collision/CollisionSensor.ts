
// export class CollisionSensor {

//     steer(obstacles) {
//         const ahead = this.character.center.add(this.character.velocity.normalize().multiply(new BABYLON.Vector3(this._longRadius, 0.5, this._longRadius))); 
//         const ahead2 = this.character.center.add(this.character.velocity.normalize().multiply(vectorize(this._shortRadius)));
//         this.createLines(ahead)
//         var mostThreatening = this.findMostThreateningObstacle(ahead, ahead2, obstacles);
//         var avoidance = new BABYLON.Vector3(0, 0, 0);

//         if (mostThreatening) {
//             avoidance.x = ahead.x - mostThreatening.center.x;
//             avoidance.z = -1 * (ahead.z - mostThreatening.center.z);

//             avoidance = avoidance.normalize();
//             avoidance = avoidance.scale(this.maxAvoidanceForce);
//         } else {
//             avoidance = avoidance.scale(0); // nullify the avoidance force
//         }

//         return avoidance;
//     }

//     findMostThreateningObstacle(ahead, ahead2, obstacles) {
//         var mostThreatening = null;

//         for (let i = 0; i < obstacles.length; i++) {
//             var obstacle = obstacles[i];
//             var collision = this.lineIntersectsCircle(ahead, ahead2, obstacle);

//             // "position" is the character's current position
//             if (collision 
//                     && (
//                         !mostThreatening ||
//                         this.distance(this.character.center, obstacle.center) < this.distance(this.character.center, mostThreatening.center)
//                     )
//             ) {
//                 mostThreatening = obstacle;
//             }
//         }

//         if (mostThreatening) {
//             mostThreatening.applyRedMaterial();
//         }

//         return mostThreatening;
//     }

//     distance(a, b) {
//         return Math.sqrt((a.x - b.x) * (a.x - b.x)  + (a.z - b.z) * (a.z - b.z));
//     }

//     lineIntersectsCircle(ahead, ahead2, obstacle) {
//         return this.distance(obstacle.center, ahead) <= obstacle.radius || this.distance(obstacle.center, ahead2) <= obstacle.radius;
//     }
// }
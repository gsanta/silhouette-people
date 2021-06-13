import { Tools } from "babylonjs";
import { toStandardAngle } from "../../../../src/helpers";
import { CollisionSensor } from "../../../../src/service/motion/collision/CollisionSensor";
import { CharacterBuilder } from "../../../test_utils/characterUtils";

// describe("Get steering points", () => {
//     it ('one obstacle, it is within range', () => {
//         var engine = new NullEngine();
//         var scene = new Scene(engine);

//         const obstacle = createObstacle('obstacle', new Vector3(6, 0, 0), 2, 4, scene);
//         const character = createCharacter(new Vector3(2, 0, 0), new Vector3(1, 0, 0), scene);

//         const collisionSensor = new CollisionSensor(character);
//         const steeringPoints = collisionSensor.getSteeringPoints([obstacle]);

//         expect(steeringPoints[0].x).toBeCloseTo(5);
//         expect(steeringPoints[0].y).toBeCloseTo(-1.732);
//         expect(steeringPoints[1].x).toBeCloseTo(5);
//         expect(steeringPoints[1].y).toBeCloseTo(1.732);
//     });

//     it ('no obstacles in range', () => {
//         var engine = new NullEngine();
//         var scene = new Scene(engine);

//         const obstacle1 = createObstacle('obstacle', new Vector3(4, 0, 4), 2, 4, scene);
//         const obstacle2 = createObstacle('obstacle2', new Vector3(-2, 0, 0), 3, 4, scene);
//         const character = createCharacter(new Vector3(-1, 0, 0), new Vector3(1, 0, 0), scene);

//         const collisionSensor = new CollisionSensor(character);
//         const steeringPoints = collisionSensor.getSteeringPoints([obstacle1, obstacle2]);

//         expect(steeringPoints).toEqual([]);
//     });

//     it ('obstacle too close (character pos is not an external point)', () => {
//         var engine = new NullEngine();
//         var scene = new Scene(engine);

//         const obstacle1 = createObstacle('obstacle', new Vector3(4, 0, 0), 2, 4, scene);
//         const character = createCharacter(new Vector3(3, 0, 0), new Vector3(1, 0, 0), scene);

//         const collisionSensor = new CollisionSensor(character);
//         const steeringPoints = collisionSensor.getSteeringPoints([obstacle1]);

//         expect(steeringPoints).toEqual([]);
//     });

//     it ('multiple obstacles within range', () => {
//         var engine = new NullEngine();
//         var scene = new Scene(engine);

//         const inRange1 = createObstacle('obstacle1', new Vector3(1, 0, 5), 2, 3, scene);
//         const inRange2 = createObstacle('obstacle2', new Vector3(1, 0, 4), 2, 3, scene);
//         const notInRange = createObstacle('obstacle3', new Vector3(8, 0, 8), 2, 3, scene);

//         const character = createCharacter(new Vector3(1, 0, 1), new Vector3(0, 0, 1), scene);

//         const collisionSensor = new CollisionSensor(character);
//         const steeringPoints = collisionSensor.getSteeringPoints([notInRange, inRange2, inRange1]);

//         expect(steeringPoints[0].x).toBeCloseTo(2.49);
//         expect(steeringPoints[0].y).toBeCloseTo(2.666);
//         expect(steeringPoints[1].x).toBeCloseTo(-0.49);
//         expect(steeringPoints[1].y).toBeCloseTo(2.666);

//     });
// });

declare const charBuilder: CharacterBuilder;

describe("Get steering angles", () => {
    it ('no obstacle within sensor distance', () => {
        const character = charBuilder.pos(1, 0, 0).velocity(1, 0, 0).collisionSensorDistance(2).build();
        const obstacle = charBuilder.pos(6, 0, 0).radius(2).build();

        const collisionSensor = new CollisionSensor(character);
        const steeringAngles = collisionSensor.getSteeringAngles([obstacle]);

        expect(steeringAngles).toEqual(undefined);
    });

    it ('one obstacle within sensor distance (\u2192)', () => {
        const character = charBuilder.pos(1, 0, 0).velocity(1, 0, 0).collisionSensorDistance(2).build();
        const obstacle = charBuilder.pos(4, 0, 0).radius(2).build();

        const collisionSensor = new CollisionSensor(character, 0);
        const steeringAngles = collisionSensor.getSteeringAngles([obstacle]);

        expect(Tools.ToDegrees(toStandardAngle(steeringAngles.angle1))).toBeCloseTo(318.189);
        expect(Tools.ToDegrees(toStandardAngle(steeringAngles.angle2))).toBeCloseTo(41.81);
    });

    it ('one obstacle within sensor distance (\u2191)', () => {
        const character = charBuilder.pos(1, 0, 0).velocity(0, 0, 1).collisionSensorDistance(2).build();
        const obstacle = charBuilder.pos(1, 0, 4).radius(2).build();

        const collisionSensor = new CollisionSensor(character, 0);
        const steeringAngles = collisionSensor.getSteeringAngles([obstacle]);

        expect(Tools.ToDegrees(toStandardAngle(steeringAngles.angle1))).toBeCloseTo(60);
        expect(Tools.ToDegrees(toStandardAngle(steeringAngles.angle2))).toBeCloseTo(120);
    });

    it ('one obstacle within sensor distance (\u2190)', () => {
        const character = charBuilder.pos(1, 0, 1).velocity(-1, 0, 0).collisionSensorDistance(2).build();
        const obstacle = charBuilder.pos(-3, 0, 1).radius(2).build();

        const collisionSensor = new CollisionSensor(character, 0);
        const steeringAngles = collisionSensor.getSteeringAngles([obstacle]);

        expect(Tools.ToDegrees(toStandardAngle(steeringAngles.angle1))).toBeCloseTo(150);
        expect(Tools.ToDegrees(toStandardAngle(steeringAngles.angle2))).toBeCloseTo(210);
    });

    it ('one obstacle in sensor distance (\u2193)', () => {
        const character = charBuilder.pos(1, 0, 1).velocity(0, 0, -1).collisionSensorDistance(2).build();
        const obstacle = charBuilder.pos(1, 0, -3).radius(2).build();

        const collisionSensor = new CollisionSensor(character, 0);
        const steeringAngles = collisionSensor.getSteeringAngles([obstacle]);

        expect(Tools.ToDegrees(toStandardAngle(steeringAngles.angle1))).toBeCloseTo(240);
        expect(Tools.ToDegrees(toStandardAngle(steeringAngles.angle2))).toBeCloseTo(300);
    });
});
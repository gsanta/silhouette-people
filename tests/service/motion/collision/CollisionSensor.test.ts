import { Mesh, NullEngine, Scene, Vector3 } from "babylonjs";
import { CharacterItem } from "../../../../src/model/item/character/CharacterItem";
import { CollisionSensor } from "../../../../src/service/motion/collision/CollisionSensor";

describe("Get steering points", () => {
    it ('one obstacle, it is within range', () => {
        var engine = new NullEngine();
        var scene = new Scene(engine);

        const obstacle = createObstacle('obstacle', new Vector3(6, 0, 0), 2, 4, scene);
        const character = createCharacter(new Vector3(2, 0, 0), new Vector3(1, 0, 0), scene);

        const collisionSensor = new CollisionSensor(character);
        const steeringPoints = collisionSensor.getSteeringPoints([obstacle]);

        expect(steeringPoints[0].x).toBeCloseTo(5);
        expect(steeringPoints[0].y).toBeCloseTo(-1.732);
        expect(steeringPoints[1].x).toBeCloseTo(5);
        expect(steeringPoints[1].y).toBeCloseTo(1.732);
    });

    it ('no obstacles in range', () => {
        var engine = new NullEngine();
        var scene = new Scene(engine);

        const obstacle1 = createObstacle('obstacle', new Vector3(4, 0, 4), 2, 4, scene);
        const obstacle2 = createObstacle('obstacle2', new Vector3(-2, 0, 0), 3, 4, scene);
        const character = createCharacter(new Vector3(-1, 0, 0), new Vector3(1, 0, 0), scene);

        const collisionSensor = new CollisionSensor(character);
        const steeringPoints = collisionSensor.getSteeringPoints([obstacle1, obstacle2]);

        expect(steeringPoints).toEqual([]);
    });

    it ('obstacle too close (character pos is not an external point)', () => {
        var engine = new NullEngine();
        var scene = new Scene(engine);

        const obstacle1 = createObstacle('obstacle', new Vector3(4, 0, 0), 2, 4, scene);
        const character = createCharacter(new Vector3(3, 0, 0), new Vector3(1, 0, 0), scene);

        const collisionSensor = new CollisionSensor(character);
        const steeringPoints = collisionSensor.getSteeringPoints([obstacle1]);

        expect(steeringPoints).toEqual([]);
    });

    it ('multiple obstacles within range', () => {
        var engine = new NullEngine();
        var scene = new Scene(engine);

        const inRange1 = createObstacle('obstacle1', new Vector3(1, 0, 5), 2, 3, scene);
        const inRange2 = createObstacle('obstacle2', new Vector3(1, 0, 4), 2, 3, scene);
        const notInRange = createObstacle('obstacle3', new Vector3(8, 0, 8), 2, 3, scene);

        const character = createCharacter(new Vector3(1, 0, 1), new Vector3(0, 0, 1), scene);

        const collisionSensor = new CollisionSensor(character);
        const steeringPoints = collisionSensor.getSteeringPoints([notInRange, inRange2, inRange1]);

        expect(steeringPoints[0].x).toBeCloseTo(2.49);
        expect(steeringPoints[0].y).toBeCloseTo(2.666);
        expect(steeringPoints[1].x).toBeCloseTo(-0.49);
        expect(steeringPoints[1].y).toBeCloseTo(2.666);

    });
});

function createObstacle(id: string, position: Vector3, radius: number, collisionSensorDist: number, scene: Scene): CharacterItem {
    const character = new CharacterItem('obstacle-1');

    const mesh = new Mesh(`${id}-mesh`, scene);

    character.meshes = [mesh];
    character.position = position;
    character.radius = radius;
    character.collisionSensorDistance = collisionSensorDist;
    return character;
}

function createCharacter(position: Vector3, velocity: Vector3, scene: Scene): CharacterItem {
    const character = new CharacterItem('character-1');
    const mesh = new Mesh('character-mesh', scene);
    character.meshes = [mesh];
    character.velocity = velocity;
    character.position = position;
    return character;
}